import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase.js";

// In-memory count cache: { [kothaId]: { count: number, ts: number } }
const countCache = {};
const COUNT_TTL = 60_000; // 60 seconds

// ── useMemberships ─────────────────────────────────────────────────────────────
// All memberships for the current user. Realtime-subscribed so CommunitiesScreen
// and the "Active In" badge stay in sync across tabs.
export function useMemberships(userId) {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMemberships = useCallback(async () => {
    if (!userId) {
      setMemberships([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", userId)
      .order("joined_at", { ascending: true });
    if (data) setMemberships(data);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchMemberships();
    if (!userId) return;
    const channel = supabase
      .channel(`memberships_${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "memberships", filter: `user_id=eq.${userId}` },
        fetchMemberships
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId, fetchMemberships]);

  const memberKothaIds = new Set(memberships.map(m => m.kotha_id));
  return { memberships, memberKothaIds, loading, refetch: fetchMemberships };
}

// ── useKothaMembership ─────────────────────────────────────────────────────────
// Per-kotha join/leave for FeedScreen. Optimistic updates with rollback.
export function useKothaMembership(kothaId, userId) {
  const [isMember, setIsMember] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [memberCount, setMemberCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kothaId) return;

    // Membership check
    (async () => {
      if (!userId) {
        setIsMember(false);
        setLoading(false);
      } else {
        const { data } = await supabase
          .from("memberships")
          .select("id")
          .eq("user_id", userId)
          .eq("kotha_id", kothaId)
          .maybeSingle();
        setIsMember(!!data);
        setLoading(false);
      }
    })();

    // Member count (cached)
    const cached = countCache[kothaId];
    if (cached && Date.now() - cached.ts < COUNT_TTL) {
      setMemberCount(cached.count);
    } else {
      supabase
        .from("memberships")
        .select("id", { count: "exact", head: true })
        .eq("kotha_id", kothaId)
        .then(({ count }) => {
          if (count !== null) {
            countCache[kothaId] = { count, ts: Date.now() };
            setMemberCount(count);
          }
        });
    }
  }, [kothaId, userId]);

  const join = useCallback(async () => {
    if (!userId || toggling) return;
    setIsMember(true); // optimistic
    setToggling(true);
    const { error } = await supabase
      .from("memberships")
      .insert({ user_id: userId, kotha_id: kothaId });
    if (error) {
      setIsMember(false); // rollback
    } else {
      const prev = countCache[kothaId]?.count ?? 0;
      countCache[kothaId] = { count: prev + 1, ts: Date.now() };
      setMemberCount(prev + 1);
    }
    setToggling(false);
  }, [kothaId, userId, toggling]);

  const leave = useCallback(async () => {
    if (!userId || toggling) return;
    setIsMember(false); // optimistic
    setToggling(true);
    const { error } = await supabase
      .from("memberships")
      .delete()
      .eq("user_id", userId)
      .eq("kotha_id", kothaId);
    if (error) {
      setIsMember(true); // rollback
    } else {
      const prev = countCache[kothaId]?.count ?? 1;
      countCache[kothaId] = { count: Math.max(prev - 1, 0), ts: Date.now() };
      setMemberCount(Math.max(prev - 1, 0));
    }
    setToggling(false);
  }, [kothaId, userId, toggling]);

  const updateNotifyPrefs = useCallback(async (patch) => {
    if (!userId || !kothaId) return;
    await supabase
      .from("memberships")
      .update(patch)
      .eq("user_id", userId)
      .eq("kotha_id", kothaId);
  }, [kothaId, userId]);

  return { isMember, loading, toggling, join, leave, memberCount, updateNotifyPrefs };
}
