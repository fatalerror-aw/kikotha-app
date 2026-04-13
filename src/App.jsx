import React, { useState, useRef, useCallback } from "react";

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  en: {
    brand: "Ki Kotha", brandBn: "কি কথা", tagline: "What's the talk?",
    taglineSub: "The global Bangladeshi community platform — trusted, bilingual, AI-powered.",
    explore: "Explore Communities →", trending: "🔥 Trending Now", seeAll: "See all",
    home: "Home", feed: "Feed", communities: "Communities", saved: "Saved", profile: "Profile",
    join: "+ Join", joined: "✓ Joined",
    where: "Where are you based?", personalizeSub: "We'll personalize your Ki Kotha feed",
    continueBtn: "Continue →", step: (n, t) => `Step ${n} of ${t}`,
    kothas: "Kothas", commCount: "10 communities", members: "members", active: "Active now",
    filterHot: "🔥 Hot", filterNew: "🆕 New", filterQ: "❓ Questions", filterNews: "📰 News", filterWarn: "⚠️ Warnings",
    typeDisc: "Discussion", typeQ: "Question", typeNews: "News", typeWarn: "Warning",
    aiBadge: "🤖  Ki Kotha AI  ·  Pinned Response",
    aiDisclaimer: "Informational only — not legal advice. Always consult a qualified professional.",
    helpful: "Was this helpful?", yes: "👍 Yes", no: "👎 No",
    communityAdd: "Community members can reply below ↓",
    commentsHdr: (n) => `${n} Comments`, share: "↗ Share", back: "←",
    profileName: "Adam Wadud", profileBio: "Branch Manager · Toronto 🇨🇦",
    memberSince: "Member since March 2026  ·  Founding Member",
    postsLabel: "Posts", commentsLabel: "Comments", reactionsLabel: "Reactions",
    joinedKothas: "Kothas Joined", premiumTitle: "Ki Kotha Premium",
    premiumSub: "Active · Renews April 2027", manage: "Manage →",
    verified: "Verified", founding: "Founding", premium: "Premium",
    sources: "Sources: IRCC.gc.ca · Canada.ca/express-entry",
    askPlaceholder: "Ask a question in this Kotha...",
    postBtn: "Post Question", thinking: "Ki Kotha AI is researching your question...",
    langToggle: "বাংলা", logout: "Sign Out",
    chooseCountry: "Choose a destination", signIn: "Sign In", signUp: "Sign Up",
    emailLabel: "Email", passwordLabel: "Password", nameLabel: "Full name",
    createAccount: "Create Account", authTagline: "The global Bangladeshi community",
    k: { immigration: "Immigration", fraudwatch: "Fraud Watch", jobscareer: "Jobs & Career", lifeabroad: "Life Abroad", gcccorner: "GCC Corner", canada: "Canada", uk: "United Kingdom", familyvisa: "Family & Visa", students: "Students", bangladeshnews: "Bangladesh News" },
  },
  bn: {
    brand: "কি কথা", brandBn: "Ki Kotha", tagline: "কি কথা বলছেন?",
    taglineSub: "বিশ্বব্যাপী বাংলাদেশি সম্প্রদায়ের প্ল্যাটফর্ম — বিশ্বস্ত, দ্বিভাষিক, AI-চালিত।",
    explore: "সম্প্রদায় দেখুন →", trending: "🔥 এখন ট্রেন্ডিং", seeAll: "সব দেখুন",
    home: "হোম", feed: "ফিড", communities: "কমিউনিটি", saved: "সংরক্ষিত", profile: "প্রোফাইল",
    join: "+ যোগ দিন", joined: "✓ যোগ দিয়েছেন",
    where: "আপনি কোথায় আছেন?", personalizeSub: "আমরা আপনার ফিড কাস্টমাইজ করব",
    continueBtn: "পরবর্তী →", step: (n, t) => `ধাপ ${n} / ${t}`,
    kothas: "কোথা সমূহ", commCount: "১০টি সম্প্রদায়", members: "সদস্য", active: "এখন সক্রিয়",
    filterHot: "🔥 জনপ্রিয়", filterNew: "🆕 নতুন", filterQ: "❓ প্রশ্ন", filterNews: "📰 খবর", filterWarn: "⚠️ সতর্কতা",
    typeDisc: "আলোচনা", typeQ: "প্রশ্ন", typeNews: "খবর", typeWarn: "সতর্কতা",
    aiBadge: "🤖  কি কথা AI  ·  পিন করা উত্তর",
    aiDisclaimer: "শুধুমাত্র তথ্যমূলক — আইনি পরামর্শ নয়।",
    helpful: "এটা কি সহায়ক ছিল?", yes: "👍 হ্যাঁ", no: "👎 না",
    communityAdd: "নিচে সম্প্রদায় উত্তর যোগ করতে পারেন ↓",
    commentsHdr: (n) => `${n}টি মন্তব্য`, share: "↗ শেয়ার", back: "←",
    profileName: "আদম ওয়াদুদ", profileBio: "ব্র্যাঞ্চ ম্যানেজার · টরন্টো 🇨🇦",
    memberSince: "সদস্য মার্চ ২০২৬ থেকে  ·  প্রতিষ্ঠাতা সদস্য",
    postsLabel: "পোস্ট", commentsLabel: "মন্তব্য", reactionsLabel: "প্রতিক্রিয়া",
    joinedKothas: "যোগ দেওয়া কোথা", premiumTitle: "কি কথা প্রিমিয়াম",
    premiumSub: "সক্রিয় · নবায়ন এপ্রিল ২০২৭", manage: "পরিচালনা →",
    verified: "যাচাইকৃত", founding: "প্রতিষ্ঠাতা", premium: "প্রিমিয়াম",
    sources: "সূত্র: IRCC.gc.ca · Canada.ca/express-entry",
    askPlaceholder: "এই কোথায় প্রশ্ন করুন...",
    postBtn: "প্রশ্ন পোস্ট করুন", thinking: "কি কথা AI আপনার প্রশ্ন গবেষণা করছে...",
    langToggle: "English", logout: "সাইন আউট",
    chooseCountry: "গন্তব্য বেছে নিন", signIn: "সাইন ইন", signUp: "সাইন আপ",
    emailLabel: "ইমেইল", passwordLabel: "পাসওয়ার্ড", nameLabel: "পুরো নাম",
    createAccount: "অ্যাকাউন্ট তৈরি করুন", authTagline: "বিশ্বব্যাপী বাংলাদেশি সম্প্রদায়",
    k: { immigration: "অভিবাসন", fraudwatch: "প্রতারণা সতর্কতা", jobscareer: "চাকরি ও ক্যারিয়ার", lifeabroad: "প্রবাসী জীবন", gcccorner: "জিসিসি কর্নার", canada: "কানাডা", uk: "যুক্তরাজ্য", familyvisa: "পরিবার ও ভিসা", students: "শিক্ষার্থী", bangladeshnews: "বাংলাদেশ সংবাদ" },
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const KOTHAS = [
  { id: "immigration", icon: "✈️", members: "124,847" },
  { id: "fraudwatch",  icon: "🛡️", members: "89,000"  },
  { id: "jobscareer",  icon: "💼", members: "67,000"  },
  { id: "lifeabroad",  icon: "🌍", members: "54,000"  },
  { id: "gcccorner",   icon: "🌙", members: "112,000" },
  { id: "canada",      icon: "🍁", members: "98,000"  },
  { id: "uk",          icon: "🇬🇧", members: "43,000"  },
  { id: "familyvisa",  icon: "👨‍👩‍👧", members: "38,000"  },
  { id: "students",    icon: "🎓", members: "29,000"  },
  { id: "bangladeshnews", icon: "📰", members: "76,000" },
];

const IMMIGRATION_COUNTRIES = [
  { id: "ca", flag: "🇨🇦", en: "Canada",       bn: "কানাডা" },
  { id: "gb", flag: "🇬🇧", en: "UK",            bn: "যুক্তরাজ্য" },
  { id: "sa", flag: "🇸🇦", en: "Saudi Arabia",  bn: "সৌদি আরব" },
  { id: "ae", flag: "🇦🇪", en: "UAE",           bn: "আমিরাত" },
  { id: "qa", flag: "🇶🇦", en: "Qatar",         bn: "কাতার" },
  { id: "kw", flag: "🇰🇼", en: "Kuwait",        bn: "কুয়েত" },
  { id: "au", flag: "🇦🇺", en: "Australia",     bn: "অস্ট্রেলিয়া" },
  { id: "bd", flag: "🇧🇩", en: "Bangladesh",    bn: "বাংলাদেশ" },
];

const POSTS = [
  { id:1, av:"SW", flag:"🇨🇦", name:"Shahid W.", nameBn:"শাহিদ ও.", badge:true,  kotha:"canada",      time:"2h", type:"Discussion", titleEn:"Got my PR approved — CRS 487, here's my full timeline and everything that worked", titleBn:"PR অনুমোদন পেয়েছি — CRS ৪৮৭, আমার সম্পূর্ণ টাইমলাইন", reactions:"❤️ 203  🎉 67", comments:88 },
  { id:2, av:"MH", flag:"🇸🇦", name:"Mina H.",   nameBn:"মিনা হো.", badge:false, kotha:"immigration", time:"5h", type:"Question",   titleEn:"Can I apply for Canada PR while on a Saudi work visa? My employer knows my plans", titleBn:"কানাডা PR আবেদন কি সৌদি ওয়ার্ক ভিসায় থাকা অবস্থায় করা যাবে?", reactions:"🤔 45  ❤️ 23", comments:34 },
  { id:3, av:"RK", flag:"🇧🇩", name:"Rahim K.",  nameBn:"রহিম ক.",  badge:true,  kotha:"immigration", time:"8h", type:"News",       titleEn:"IRCC announced a new draw — 3,500 ITAs issued, minimum CRS dropped to 481", titleBn:"IRCC নতুন ড্র ঘোষণা করেছে — ৩,৫০০ ITA, সর্বনিম্ন CRS ৪৮১", reactions:"🎉 412  ❤️ 289", comments:156 },
  { id:4, av:"FA", flag:"🇦🇪", name:"Farida A.", nameBn:"ফরিদা আ.", badge:true,  kotha:"gcccorner",   time:"1d", type:"Discussion", titleEn:"UAE Golden Visa for skilled professionals — complete breakdown for Bangladeshis 2026", titleBn:"UAE গোল্ডেন ভিসা — বাংলাদেশিদের জন্য সম্পূর্ণ গাইড ২০২৬", reactions:"❤️ 156  🎉 43", comments:72 },
  { id:5, av:"TH", flag:"🇧🇩", name:"Tariq H.",  nameBn:"তারিক হো.", badge:false, kotha:"fraudwatch",  time:"3h", type:"Warning",    titleEn:"⚠️ ALERT: Fake Qatar recruitment agency on Facebook — names inside, please share", titleBn:"⚠️ সতর্কতা: ভুয়া কাতার রিক্রুটমেন্ট এজেন্সি Facebook-এ সক্রিয়", reactions:"😡 89  ❤️ 34", comments:201 },
];

const COMMENTS = [
  { av:"AK", flag:"🇨🇦", name:"Arif K.", nameBn:"আরিফ ক.", badge:true,  textEn:"I can confirm — I applied from UAE on a work visa. Full process took 8 months.", textBn:"আমি নিশ্চিত করতে পারি — UAE থেকে আবেদন করেছিলাম। মোট ৮ মাস লেগেছিল।", reactions:"❤️ 34" },
  { av:"SR", flag:"🇬🇧", name:"Sara R.",  nameBn:"সারা র.",  badge:false, textEn:"Make sure your IELTS is valid for the entire processing period.", textBn:"নিশ্চিত করুন যে আপনার IELTS প্রক্রিয়াকরণের সময় পর্যন্ত বৈধ থাকে।", reactions:"❤️ 12" },
  { av:"NK", flag:"🇧🇩", name:"Nasrin K.", nameBn:"নাসরিন ক.", badge:true, textEn:"Also check your NOC code is valid under TEER — many codes changed in 2023.", textBn:"আপনার NOC কোড TEER-এর অধীনে বৈধ কিনা চেক করুন।", reactions:"❤️ 28" },
];

const ONBOARD_COUNTRIES = [
  { flag:"🇧🇩", en:"Bangladesh", bn:"বাংলাদেশ" },
  { flag:"🇨🇦", en:"Canada",     bn:"কানাডা" },
  { flag:"🇬🇧", en:"UK",         bn:"যুক্তরাজ্য" },
  { flag:"🇸🇦", en:"Saudi Arabia", bn:"সৌদি আরব" },
  { flag:"🇦🇪", en:"UAE",        bn:"আমিরাত" },
  { flag:"🇶🇦", en:"Qatar",      bn:"কাতার" },
  { flag:"🇰🇼", en:"Kuwait",     bn:"কুয়েত" },
  { flag:"🇦🇺", en:"Australia",  bn:"অস্ট্রেলিয়া" },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Hind+Siliguri:wght@300;400;500;600&display=swap');
  :root {
    --bg:#0A0A0A;
    --card:#111111;--card2:#111111;--card3:#181818;
    --border:#222222;--border2:#2A2A2A;
    --text:#F5F5F5;--text2:#999999;--muted:#555555;--muted2:#333333;
    --gold:#B8962E;--gold2:#D4AF5A;--gold-dim:#1A1200;--gold-border:#5A3F0A;
    --radius:16px;--radius-sm:10px;
    --font-display:'Cormorant Garamond',Georgia,serif;
    --font-body:'DM Sans',system-ui,sans-serif;
    --font-bn:'Hind Siliguri','DM Sans',system-ui,sans-serif;
  }
  *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  body{background:var(--bg);min-height:100vh;font-family:var(--font-body);color:var(--text);}

  /* Layout */
  .phone{width:100vw;min-height:100vh;background:var(--bg);display:flex;flex-direction:column;overflow:hidden;}
  .screen{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:80px;}
  .screen::-webkit-scrollbar{display:none;}

  /* Slide transitions */
  @keyframes slideInFromRight{from{transform:translateX(100%)}to{transform:translateX(0)}}
  @keyframes slideInFromLeft{from{transform:translateX(-40px);opacity:0}to{transform:translateX(0);opacity:1}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .slide-forward{animation:slideInFromRight 0.3s cubic-bezier(0.25,0.46,0.45,0.94);}
  .slide-back{animation:slideInFromLeft 0.22s ease-out;}
  .slide-none{animation:fadeIn 0.2s ease;}
  .fade-in{animation:fadeIn 0.22s ease;}

  /* Top bar */
  .top-bar{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:var(--bg);border-bottom:1px solid var(--border);flex-shrink:0;}
  .logo{font-family:var(--font-display);font-size:20px;color:var(--text);font-weight:700;letter-spacing:-0.3px;}
  .logo span{font-family:var(--font-bn);font-size:12px;color:var(--muted);margin-left:6px;font-weight:400;}
  .kotha-title{font-size:13px;font-weight:600;color:var(--text2);}
  .actions{display:flex;gap:10px;align-items:center;}
  .icon-btn{background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;padding:4px;line-height:1;}
  .lang-btn{background:var(--card3);border:1px solid var(--border2);color:var(--text2);font-size:11px;font-family:var(--font-bn);font-weight:600;padding:4px 10px;border-radius:20px;cursor:pointer;}

  /* Bottom nav */
  .bottom-nav{position:fixed;bottom:0;left:0;width:100%;height:68px;background:rgba(10,10,10,0.95);border-top:1px solid var(--border);display:flex;z-index:100;backdrop-filter:blur(12px);}
  .nav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;background:none;border:none;padding:0;}
  .nav-label{font-size:9px;font-family:var(--font-bn);color:var(--muted);}
  .nav-item.active .nav-label{color:var(--gold);}
  .nav-dot{width:4px;height:4px;border-radius:50%;background:var(--gold);margin-top:1px;}

  /* Auth screen */
  .auth-screen{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:32px 24px;}
  .auth-logo{text-align:center;margin-bottom:48px;}
  .auth-brand{font-family:var(--font-display);font-size:42px;color:var(--text);font-weight:700;letter-spacing:-1px;}
  .auth-bn{font-family:var(--font-bn);font-size:15px;color:var(--muted);margin-top:4px;}
  .auth-tagline{font-size:12px;color:var(--muted2);margin-top:10px;font-family:var(--font-bn);}
  .auth-card{width:100%;max-width:380px;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:24px;}
  .auth-tabs{display:flex;background:var(--card3);border-radius:12px;padding:4px;margin-bottom:20px;gap:4px;}
  .auth-tab{flex:1;padding:10px;border:none;background:none;color:var(--muted);font-size:13px;font-family:var(--font-bn);font-weight:600;border-radius:9px;cursor:pointer;transition:all 0.2s;}
  .auth-tab.active{background:var(--border2);color:var(--text);}
  .auth-input{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--text);font-size:14px;font-family:var(--font-body);padding:13px 14px;border-radius:12px;outline:none;margin-bottom:10px;transition:border-color 0.2s;}
  .auth-input:focus{border-color:#555;}
  .auth-input::placeholder{color:var(--muted2);}
  .auth-error{font-size:12px;color:#E57373;margin-bottom:12px;font-family:var(--font-bn);}
  .auth-submit{width:100%;padding:14px;background:var(--text);color:#0A0A0A;font-size:14px;font-weight:700;border:none;border-radius:12px;cursor:pointer;font-family:var(--font-body);margin-top:6px;}

  /* Story row (Instagram-style) */
  .story-row{display:flex;gap:14px;padding:14px 16px 10px;overflow-x:auto;border-bottom:1px solid var(--border);}
  .story-row::-webkit-scrollbar{display:none;}
  .story-item{display:flex;flex-direction:column;align-items:center;gap:5px;flex-shrink:0;cursor:pointer;}
  .story-circle{width:58px;height:58px;border-radius:50%;background:var(--card3);border:2px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:26px;transition:border-color 0.2s;}
  .story-circle:active{border-color:#555;}
  .story-label{font-size:9px;color:var(--muted);font-family:var(--font-bn);text-align:center;max-width:62px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

  /* Hero */
  .hero{background:linear-gradient(180deg,#131313 0%,var(--bg) 100%);padding:28px 20px 24px;position:relative;overflow:hidden;}
  .hero-title{font-family:var(--font-display);font-size:32px;color:var(--text);font-weight:700;letter-spacing:-0.5px;}
  .hero-sub{font-size:12px;color:var(--muted);margin-top:8px;line-height:1.6;font-family:var(--font-bn);}
  .hero-btn{margin-top:16px;display:inline-block;background:var(--card3);border:1px solid var(--border2);color:var(--text2);font-size:12px;font-weight:600;padding:9px 18px;border-radius:20px;cursor:pointer;font-family:var(--font-bn);}

  /* Section */
  .section-hdr{display:flex;justify-content:space-between;align-items:center;padding:16px 16px 10px;}
  .section-title{font-size:13px;font-weight:600;color:var(--text);font-family:var(--font-bn);}
  .section-link{font-size:11px;color:var(--text2);cursor:pointer;font-family:var(--font-bn);}
  .divider{height:1px;background:var(--border);margin:4px 0;}

  /* Post card */
  .post-card{margin:0 10px 8px;padding:14px 14px 10px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:background 0.15s;position:relative;}
  .post-card:active{background:var(--card3);}
  .post-meta{display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;}
  .avatar{width:28px;height:28px;border-radius:50%;background:var(--card3);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--text2);flex-shrink:0;}
  .post-author{font-size:11px;font-weight:600;color:var(--text);font-family:var(--font-bn);}
  .verified{color:var(--gold);font-size:10px;}
  .post-kotha{font-size:10px;color:var(--muted);background:var(--card3);padding:2px 8px;border-radius:10px;font-family:var(--font-bn);}
  .post-time{font-size:10px;color:var(--muted2);margin-left:auto;}
  .type-badge{font-size:9px;font-weight:600;padding:2px 8px;border-radius:8px;font-family:var(--font-bn);}
  .type-Q{background:#0A1520;color:#5BA3D9;}
  .type-D{background:#1A1A1A;color:#888;}
  .type-N{background:#0A1A0A;color:#4CAF50;}
  .type-W{background:#1A0A0A;color:#E57373;}
  .post-title{font-size:13px;color:var(--text);line-height:1.55;margin-bottom:10px;font-family:var(--font-bn);font-weight:500;}
  .post-footer{display:flex;align-items:center;justify-content:space-between;}
  .reactions{font-size:11px;color:var(--muted);}
  .comment-count{font-size:10px;color:var(--text2);}

  /* Filters */
  .filters{display:flex;gap:6px;padding:10px 12px;overflow-x:auto;}
  .filters::-webkit-scrollbar{display:none;}
  .filter-pill{white-space:nowrap;font-size:11px;padding:5px 12px;border-radius:14px;cursor:pointer;border:1px solid var(--border);background:var(--card2);color:var(--muted);font-family:var(--font-bn);flex-shrink:0;}
  .filter-pill.active{border-color:var(--gold-border);color:var(--gold2);background:var(--gold-dim);}

  /* AI */
  .ai-response{margin:0 10px 8px;padding:14px;background:#0D0D0D;border:1px solid #1E1E1E;border-left:3px solid var(--gold);border-radius:var(--radius);}
  .ai-badge{display:inline-flex;align-items:center;gap:6px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold2);font-size:10px;font-weight:600;padding:3px 10px;border-radius:10px;margin-bottom:10px;font-family:var(--font-bn);}
  .ai-text{font-size:12px;color:var(--text);line-height:1.7;font-family:var(--font-bn);}
  .ai-source{font-size:10px;color:var(--muted);margin-top:10px;}
  .ai-disclaimer{font-size:10px;color:var(--muted);font-style:italic;margin-top:4px;}
  .ai-feedback{margin-top:12px;padding-top:10px;border-top:1px solid #1E1E1E;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
  .ai-feedback-label{font-size:11px;color:var(--muted);font-family:var(--font-bn);}
  .feedback-btn{font-size:11px;padding:4px 12px;border-radius:10px;cursor:pointer;border:1px solid var(--border);background:var(--card3);color:var(--muted);font-family:var(--font-bn);}
  .feedback-btn.yes{background:var(--gold-dim);border-color:var(--gold-border);color:var(--gold2);}
  .ai-thinking{margin:0 10px 8px;padding:14px;background:#0D0D0D;border:1px solid #1E1E1E;border-left:3px solid var(--gold);border-radius:var(--radius);}
  .thinking-dots{display:inline-flex;gap:4px;}
  .thinking-dots span{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:bounce 1.2s infinite;}
  .thinking-dots span:nth-child(2){animation-delay:0.2s;}
  .thinking-dots span:nth-child(3){animation-delay:0.4s;}
  @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}

  /* Ask box */
  .ask-box{margin:0 10px 8px;padding:12px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);}
  .ask-textarea{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--text);font-size:12px;font-family:var(--font-bn);padding:10px 12px;border-radius:10px;resize:none;outline:none;line-height:1.6;transition:border-color 0.2s;}
  .ask-textarea:focus{border-color:var(--gold-border);}
  .ask-textarea::placeholder{color:var(--muted2);}
  .ask-submit{margin-top:8px;width:100%;padding:10px;background:var(--card3);border:1px solid var(--border2);color:var(--text2);font-size:12px;font-weight:600;border-radius:10px;cursor:pointer;font-family:var(--font-bn);}

  /* Kotha header */
  .kotha-hdr{padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border);}
  .kotha-hdr-top{display:flex;justify-content:space-between;align-items:center;}
  .kotha-hdr-name{font-family:var(--font-display);font-size:20px;color:var(--text);font-weight:700;}
  .kotha-hdr-meta{font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--font-bn);}
  .join-btn{background:var(--card3);border:1px solid var(--border2);color:var(--text2);font-size:11px;padding:6px 14px;border-radius:16px;cursor:pointer;font-weight:600;font-family:var(--font-bn);}
  .join-btn.joined{color:var(--muted);}

  /* Communities grid */
  .kotha-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 12px 8px;}
  .kotha-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:16px 10px 14px;cursor:pointer;position:relative;text-align:center;transition:background 0.15s;}
  .kotha-card:active{background:var(--card3);}
  .kotha-icon{font-size:28px;margin-bottom:8px;display:block;}
  .kotha-name{font-size:12px;font-weight:600;color:var(--text);font-family:var(--font-bn);margin-bottom:3px;}
  .kotha-members{font-size:10px;color:var(--muted);font-family:var(--font-bn);}
  .kotha-joined-tag{position:absolute;top:8px;right:8px;font-size:9px;background:var(--border);color:var(--text2);padding:2px 6px;border-radius:8px;font-family:var(--font-bn);}

  /* Country list (Kotha tree) */
  .country-list{padding:0 12px 12px;}
  .country-list-card{display:flex;align-items:center;gap:14px;padding:15px 14px;background:var(--card2);border:1px solid var(--border);border-radius:14px;margin-bottom:8px;cursor:pointer;transition:background 0.15s;}
  .country-list-card:active{background:var(--card3);}
  .country-list-flag{font-size:30px;line-height:1;}
  .country-list-name{flex:1;font-size:14px;font-weight:500;color:var(--text);font-family:var(--font-bn);}
  .country-list-arrow{font-size:18px;color:var(--muted);}

  /* Comments */
  .comment{margin:0 10px 6px;padding:12px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);}
  .comment-text{font-size:12px;color:var(--text2);line-height:1.6;margin:6px 0;font-family:var(--font-bn);}
  .comment-react{font-size:10px;color:var(--muted);}

  /* Post detail */
  .post-detail-body{padding:14px 16px;background:var(--card);border-bottom:1px solid var(--border);}
  .post-full-title{font-size:15px;font-weight:600;color:var(--text);line-height:1.55;margin:10px 0;font-family:var(--font-bn);}
  .post-actions{display:flex;align-items:center;gap:16px;}
  .action-btn{font-size:11px;color:var(--muted);cursor:pointer;font-family:var(--font-bn);background:none;border:none;}
  .reactions-full{font-size:13px;color:var(--muted);}

  /* Onboarding */
  .onboard{padding:24px 20px;}
  .progress-dots{display:flex;gap:8px;justify-content:center;margin-bottom:28px;}
  .progress-dot{height:4px;border-radius:3px;background:var(--border2);}
  .progress-dot.active{background:var(--text);width:24px;}
  .progress-dot:not(.active){width:8px;}
  .onboard-title{font-family:var(--font-bn);font-size:22px;color:var(--text);text-align:center;margin-bottom:6px;}
  .onboard-sub{font-size:12px;color:var(--muted);text-align:center;margin-bottom:24px;font-family:var(--font-bn);}
  .country-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:24px;}
  .country-card{padding:14px 10px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);text-align:center;cursor:pointer;}
  .country-card.selected{background:var(--card3);border-color:var(--border2);}
  .country-flag{font-size:26px;display:block;margin-bottom:4px;}
  .country-name{font-size:11px;font-family:var(--font-bn);color:var(--text2);}
  .continue-btn{width:100%;padding:14px;background:var(--text);color:#0A0A0A;font-size:14px;font-weight:700;border:none;border-radius:14px;cursor:pointer;font-family:var(--font-body);}
  .step-label{text-align:center;margin-top:12px;font-size:11px;color:var(--muted);font-family:var(--font-bn);}

  /* Profile */
  .profile-hero{background:linear-gradient(180deg,#111 0%,var(--bg) 100%);padding:32px 20px 24px;text-align:center;}
  .profile-avatar{width:72px;height:72px;border-radius:50%;background:var(--card3);border:2px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:var(--text);margin:0 auto;}
  .profile-name{font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--text);margin-bottom:6px;margin-top:12px;}
  .badges-row{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:10px;}
  .badge-chip{background:var(--card3);border:1px solid var(--border2);padding:4px 10px;border-radius:10px;font-size:10px;color:var(--muted);font-family:var(--font-bn);}
  .profile-bio{font-size:12px;color:var(--muted);font-family:var(--font-bn);}
  .profile-since{font-size:10px;color:var(--muted2);margin-top:3px;font-family:var(--font-bn);}
  .stats-row{display:flex;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  .stat-item{flex:1;padding:14px;text-align:center;border-right:1px solid var(--border);}
  .stat-item:last-child{border-right:none;}
  .stat-val{font-family:var(--font-display);font-size:22px;color:var(--text);font-weight:700;}
  .stat-label{font-size:10px;color:var(--muted);font-family:var(--font-bn);}
  .section-label{font-size:12px;font-weight:600;color:var(--text);padding:14px 16px 8px;font-family:var(--font-bn);}
  .kotha-row{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;}
  .kotha-row-icon{font-size:20px;}
  .kotha-row-info{flex:1;}
  .kotha-row-name{font-size:13px;font-weight:600;color:var(--text);font-family:var(--font-bn);}
  .kotha-row-meta{font-size:10px;color:var(--muted);font-family:var(--font-bn);}
  .premium-banner{margin:12px;padding:14px;background:var(--card3);border:1px solid var(--border2);border-radius:var(--radius);display:flex;align-items:center;gap:10px;}
  .premium-info{flex:1;}
  .premium-title{font-size:13px;font-weight:600;color:var(--text);font-family:var(--font-bn);}
  .premium-sub{font-size:10px;color:var(--muted);font-family:var(--font-bn);}
  .premium-manage{font-size:11px;color:var(--text2);cursor:pointer;font-family:var(--font-bn);flex-shrink:0;}
  .logout-btn{margin:12px;width:calc(100% - 24px);padding:13px;background:none;border:1px solid var(--border2);color:var(--muted);font-size:13px;font-family:var(--font-bn);border-radius:12px;cursor:pointer;}

  /* Empty state */
  .empty-state{padding:60px 20px;text-align:center;}
  .empty-icon{font-size:48px;margin-bottom:12px;}
  .empty-text{font-size:14px;color:var(--muted);font-family:var(--font-bn);}
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
const typeClass = t => ({ Discussion:"D", Question:"Q", News:"N", Warning:"W", "আলোচনা":"D", "প্রশ্ন":"Q", "খবর":"N", "সতর্কতা":"W" }[t] || "D");

async function askAI(question, lang) {
  const systemPrompt = lang === "bn"
    ? "আপনি কি কথা প্ল্যাটফর্মের AI সহকারী। বাংলাদেশি প্রবাসীদের ইমিগ্রেশন, ভিসা এবং জিসিসি কর্মসংস্থান বিষয়ে সঠিক, সহায়ক তথ্য প্রদান করুন। সংক্ষিপ্ত উত্তর দিন। বলুন এটি শুধু তথ্যমূলক। বাংলায় উত্তর দিন।"
    : "You are the Ki Kotha AI assistant. Provide accurate, helpful information to Bangladeshi diaspora about immigration, visas, and GCC employment. Keep answers concise. Always note this is informational only, not legal advice.";
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 800,
        system: systemPrompt,
        messages: [{ role: "user", content: question }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "Sorry, could not generate a response right now.";
  } catch {
    return lang === "bn"
      ? "দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না।"
      : "Sorry, could not connect right now. Please try again.";
  }
}

// ── Components (all outside App to prevent remounts) ─────────────────────────

function NavIcon({ id, active }) {
  const c = active ? "var(--gold)" : "var(--muted)";
  if (id === "home") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 22V12h6v10"/>
    </svg>
  );
  if (id === "feed") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
  if (id === "communities") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/>
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><path d="M17 14c2.2.4 4 2.1 4 4.5"/>
    </svg>
  );
  if (id === "saved") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
    </svg>
  );
  if (id === "profile") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
  return null;
}

function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !name.trim()) { setError("Please enter your name."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    localStorage.setItem("kk_email", email.trim());
    if (name.trim()) localStorage.setItem("kk_name", name.trim());
    onAuth(email.trim());
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="auth-screen">
      <div className="auth-logo">
        <div className="auth-brand">Ki Kotha</div>
        <div className="auth-bn">কি কথা</div>
        <div className="auth-tagline">The global Bangladeshi community</div>
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab${mode==="login"?" active":""}`} onClick={() => { setMode("login"); setError(""); }}>Sign In</button>
          <button className={`auth-tab${mode==="signup"?" active":""}`} onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button>
        </div>
        {mode === "signup" && (
          <input className="auth-input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKey} />
        )}
        <input className="auth-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey} />
        <input className="auth-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKey} />
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-submit" onClick={handleSubmit}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}

function PostCard({ post, lang, tx, onSelect }) {
  const title = lang==="bn" ? post.titleBn : post.titleEn;
  const name  = lang==="bn" ? post.nameBn  : post.name;
  const type  = lang==="bn" ? tx[`type${typeClass(post.type)}`] || post.type : post.type;
  const tc    = typeClass(post.type);
  return (
    <div className="post-card fade-in" onClick={() => onSelect(post)}>
      <div className="post-meta">
        <div className="avatar">{post.av}</div>
        <span className="post-author">{post.flag} {name}{post.badge && <span className="verified"> ✓</span>}</span>
        <span className="post-kotha">k/{tx.k[post.kotha]}</span>
        <span className="post-time">{post.time}</span>
      </div>
      <div style={{marginBottom:6}}>
        <span className={`type-badge type-${tc}`}>{type}</span>
      </div>
      <div className="post-title">{title}</div>
      <div className="post-footer">
        <span className="reactions">{post.reactions}</span>
        <span className="comment-count">💬 {post.comments}</span>
      </div>
    </div>
  );
}

function StoryRow({ joinedKothas, tx, onSelectKotha }) {
  const joined = KOTHAS.filter(k => joinedKothas.includes(k.id));
  if (!joined.length) return null;
  return (
    <div className="story-row">
      {joined.map(k => (
        <div key={k.id} className="story-item" onClick={() => onSelectKotha(k.id)}>
          <div className="story-circle">{k.icon}</div>
          <div className="story-label">{tx.k[k.id]}</div>
        </div>
      ))}
    </div>
  );
}

function HomeScreen({ tx, lang, navigate, joinedKothas, onSelectPost, onSelectKotha }) {
  return (
    <div className="fade-in">
      <StoryRow joinedKothas={joinedKothas} tx={tx} onSelectKotha={onSelectKotha} />
      <div className="hero">
        <div className="hero-title">{tx.tagline}</div>
        <div className="hero-sub">{tx.taglineSub}</div>
        <button className="hero-btn" onClick={() => navigate("communities")}>{tx.explore}</button>
      </div>
      <div className="divider" />
      <div className="section-hdr">
        <span className="section-title">{tx.trending}</span>
        <span className="section-link" onClick={() => navigate("feed")}>{tx.seeAll}</span>
      </div>
      {POSTS.map(p => <PostCard key={p.id} post={p} lang={lang} tx={tx} onSelect={onSelectPost} />)}
    </div>
  );
}

function FeedScreen({ tx, lang, selectedKotha, selectedKothaCountry, joinedKothas, activeFilter, setActiveFilter, question, setQuestion, handleAsk, aiThinking, aiResponse, feedbackGiven, setFeedbackGiven, toggleJoin, onSelectPost }) {
  const filters = [tx.filterHot, tx.filterNew, tx.filterQ, tx.filterNews, tx.filterWarn];
  const kotha = selectedKotha ? KOTHAS.find(k => k.id === selectedKotha) : null;
  const filteredPosts = selectedKotha ? POSTS.filter(p => p.kotha === selectedKotha) : POSTS;
  const isJoined = selectedKotha ? joinedKothas.includes(selectedKotha) : false;
  return (
    <div className="fade-in">
      {kotha && (
        <div className="kotha-hdr">
          <div className="kotha-hdr-top">
            <div>
              <div className="kotha-hdr-name">
                {kotha.icon} {tx.k[kotha.id]}
                {selectedKothaCountry && <span style={{fontSize:14,color:"var(--text2)",fontFamily:"var(--font-body)",fontWeight:400}}> · {selectedKothaCountry.flag} {lang==="bn"?selectedKothaCountry.bn:selectedKothaCountry.en}</span>}
              </div>
              <div className="kotha-hdr-meta">{kotha.members} {tx.members} · {tx.active}</div>
            </div>
            <button className={`join-btn${isJoined?" joined":""}`} onClick={() => toggleJoin(kotha.id)}>
              {isJoined ? tx.joined : tx.join}
            </button>
          </div>
        </div>
      )}
      <div className="filters">
        {filters.map((f,i) => (
          <div key={i} className={`filter-pill${activeFilter===i?" active":""}`} onClick={() => setActiveFilter(i)}>{f}</div>
        ))}
      </div>
      <div className="ask-box">
        <textarea className="ask-textarea" rows={3} placeholder={tx.askPlaceholder} value={question} onChange={e => setQuestion(e.target.value)} />
        <button className="ask-submit" onClick={handleAsk}>{tx.postBtn}</button>
      </div>
      {aiThinking && (
        <div className="ai-thinking">
          <div className="ai-badge">{tx.aiBadge}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
            <div className="thinking-dots"><span/><span/><span/></div>
            <span style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-bn)"}}>{tx.thinking}</span>
          </div>
        </div>
      )}
      {aiResponse && (
        <div className="ai-response fade-in">
          <div className="ai-badge">{tx.aiBadge}</div>
          <div className="ai-text">{aiResponse}</div>
          <div className="ai-source">{tx.sources}</div>
          <div className="ai-disclaimer">{tx.aiDisclaimer}</div>
          <div className="ai-feedback">
            <span className="ai-feedback-label">{tx.helpful}</span>
            <button className={`feedback-btn yes${feedbackGiven?" active":""}`} onClick={() => setFeedbackGiven(true)}>{tx.yes}</button>
            <button className="feedback-btn" onClick={() => setFeedbackGiven(true)}>{tx.no}</button>
          </div>
        </div>
      )}
      {filteredPosts.map(p => <PostCard key={p.id} post={p} lang={lang} tx={tx} onSelect={onSelectPost} />)}
    </div>
  );
}

function KothaCountriesScreen({ tx, lang, onSelectCountry }) {
  return (
    <div className="fade-in">
      <div className="section-hdr">
        <span className="section-title">{tx.chooseCountry}</span>
      </div>
      <div className="country-list">
        {IMMIGRATION_COUNTRIES.map(c => (
          <div key={c.id} className="country-list-card" onClick={() => onSelectCountry(c)}>
            <span className="country-list-flag">{c.flag}</span>
            <span className="country-list-name">{lang==="bn" ? c.bn : c.en}</span>
            <span className="country-list-arrow">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunitiesScreen({ tx, lang, joinedKothas, onSelectKotha }) {
  return (
    <div className="fade-in">
      <div className="section-hdr">
        <span className="section-title">{tx.kothas}</span>
        <span style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-bn)"}}>{tx.commCount}</span>
      </div>
      <div className="kotha-grid">
        {KOTHAS.map(k => {
          const isJ = joinedKothas.includes(k.id);
          return (
            <div key={k.id} className="kotha-card" onClick={() => onSelectKotha(k.id)}>
              {isJ && <div className="kotha-joined-tag">{tx.joined}</div>}
              <span className="kotha-icon">{k.icon}</span>
              <div className="kotha-name">{tx.k[k.id]}</div>
              <div className="kotha-members">{k.members} {tx.members}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PostDetailScreen({ tx, lang, selectedPost, savedPosts, toggleSave, question, setQuestion, handleAsk, aiThinking, aiResponse }) {
  if (!selectedPost) return null;
  const p = selectedPost;
  const title = lang==="bn" ? p.titleBn : p.titleEn;
  const name  = lang==="bn" ? p.nameBn  : p.name;
  const type  = lang==="bn" ? tx[`type${typeClass(p.type)}`] || p.type : p.type;
  const tc    = typeClass(p.type);
  const isQ   = p.type === "Question";
  return (
    <div className="fade-in">
      <div className="post-detail-body">
        <div className="post-meta">
          <div className="avatar">{p.av}</div>
          <span className="post-author">{p.flag} {name}{p.badge && <span className="verified"> ✓</span>}</span>
          <span className="post-kotha">k/{tx.k[p.kotha]}</span>
          <span className="post-time">{p.time}</span>
        </div>
        <div style={{marginTop:6,marginBottom:2}}>
          <span className={`type-badge type-${tc}`}>{type}</span>
        </div>
        <div className="post-full-title">{title}</div>
        <div className="post-actions">
          <span className="reactions-full">{p.reactions}</span>
          <button className="action-btn" onClick={() => toggleSave(p.id)}>{savedPosts.includes(p.id)?"🔖 Saved":"🔖 Save"}</button>
          <button className="action-btn">{tx.share}</button>
        </div>
      </div>
      <div className="divider" />
      {isQ && (
        <>
          <div className="ai-response fade-in">
            <div className="ai-badge">{tx.aiBadge}</div>
            <div className="ai-text">
              {lang==="bn"
                ? "হ্যাঁ — আপনি সৌদি ওয়ার্ক ভিসায় থাকা অবস্থায় কানাডা PR এর জন্য আবেদন করতে পারবেন। এক্সপ্রেস এন্ট্রিতে কানাডায় থাকা বা বেকার থাকা প্রয়োজন নেই।"
                : "Yes — you can apply for Canadian PR while on a Saudi work visa. Express Entry does not require you to be in Canada or unemployed."}
            </div>
            <div className="ai-text" style={{marginTop:8,color:"var(--text2)"}}>
              {lang==="bn"
                ? "আপনার নিয়োগকর্তার মতামত IRCC-এর কাছে প্রাসঙ্গিক নয়। CRS স্কোর, IELTS এবং কাজের অভিজ্ঞতার ডকুমেন্টেশন প্রস্তুত রাখুন।"
                : "Your employer's knowledge of your plans is not relevant to IRCC. Ensure your CRS score, IELTS, and work experience documentation are current."}
            </div>
            <div className="ai-source">{tx.sources}</div>
            <div className="ai-disclaimer">{tx.aiDisclaimer}</div>
            <div className="ai-feedback">
              <span className="ai-feedback-label">{tx.helpful}</span>
              <button className="feedback-btn yes">{tx.yes}</button>
              <button className="feedback-btn">{tx.no}</button>
            </div>
          </div>
          <div style={{padding:"8px 16px",fontSize:11,color:"var(--muted)",fontFamily:"var(--font-bn)"}}>{tx.communityAdd}</div>
        </>
      )}
      <div className="divider" />
      <div style={{padding:"10px 16px 6px"}}>
        <span style={{fontSize:13,fontWeight:600,color:"var(--text)",fontFamily:"var(--font-bn)"}}>{tx.commentsHdr(p.comments)}</span>
      </div>
      {COMMENTS.map((c,i) => (
        <div key={i} className="comment">
          <div className="post-meta">
            <div className="avatar" style={{width:24,height:24,fontSize:9}}>{c.av}</div>
            <span className="post-author" style={{fontSize:11}}>{c.flag} {lang==="bn"?c.nameBn:c.name}{c.badge&&<span className="verified"> ✓</span>}</span>
          </div>
          <div className="comment-text">{lang==="bn"?c.textBn:c.textEn}</div>
          <div className="comment-react">{c.reactions}</div>
        </div>
      ))}
      <div className="ask-box" style={{marginTop:8}}>
        <textarea className="ask-textarea" rows={2} placeholder={lang==="bn"?"মন্তব্য লিখুন...":"Add a comment..."} value={question} onChange={e => setQuestion(e.target.value)} />
        <button className="ask-submit" onClick={handleAsk}>{lang==="bn"?"মন্তব্য করুন":"Comment"}</button>
      </div>
      {aiThinking && (
        <div className="ai-thinking">
          <div className="ai-badge">{tx.aiBadge}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
            <div className="thinking-dots"><span/><span/><span/></div>
            <span style={{fontSize:11,color:"var(--muted)"}}>{tx.thinking}</span>
          </div>
        </div>
      )}
      {aiResponse && (
        <div className="ai-response fade-in">
          <div className="ai-badge">{tx.aiBadge}</div>
          <div className="ai-text">{aiResponse}</div>
          <div className="ai-disclaimer">{tx.aiDisclaimer}</div>
        </div>
      )}
    </div>
  );
}

function SavedScreen({ lang, savedPosts, tx, onSelectPost }) {
  const saved = POSTS.filter(p => savedPosts.includes(p.id));
  if (!saved.length) return (
    <div className="empty-state fade-in">
      <div className="empty-icon">🔖</div>
      <div className="empty-text">{lang==="bn"?"কোনো সংরক্ষিত পোস্ট নেই":"No saved posts yet"}</div>
    </div>
  );
  return <div className="fade-in">{saved.map(p => <PostCard key={p.id} post={p} lang={lang} tx={tx} onSelect={onSelectPost} />)}</div>;
}

function ProfileScreen({ tx, lang, onSelectKotha, onLogout, user }) {
  const displayName = localStorage.getItem("kk_name") || user || tx.profileName;
  return (
    <div className="fade-in">
      <div className="profile-hero">
        <div className="profile-avatar">{displayName[0]?.toUpperCase() || "A"}</div>
        <div className="profile-name">{displayName}</div>
        <div className="badges-row">
          <span className="badge-chip">🇨🇦 {lang==="bn"?"কানাডা":"Canada"}</span>
          <span className="badge-chip">✓ {tx.verified}</span>
          <span className="badge-chip">👑 {tx.premium}</span>
          <span className="badge-chip">🤝 {tx.founding}</span>
        </div>
        <div className="profile-bio">{tx.profileBio}</div>
        <div className="profile-since">{tx.memberSince}</div>
      </div>
      <div className="stats-row">
        <div className="stat-item"><div className="stat-val">47</div><div className="stat-label">{tx.postsLabel}</div></div>
        <div className="stat-item"><div className="stat-val">312</div><div className="stat-label">{tx.commentsLabel}</div></div>
        <div className="stat-item"><div className="stat-val">1.2K</div><div className="stat-label">{tx.reactionsLabel}</div></div>
      </div>
      <div className="section-label">{tx.joinedKothas}</div>
      {["canada","immigration","jobscareer"].map(kid => {
        const k = KOTHAS.find(x => x.id===kid);
        return (
          <div key={kid} className="kotha-row" onClick={() => onSelectKotha(kid)}>
            <div className="kotha-row-icon">{k.icon}</div>
            <div className="kotha-row-info">
              <div className="kotha-row-name">{tx.k[kid]}</div>
              <div className="kotha-row-meta">k/{tx.k[kid]} · {k.members} {tx.members}</div>
            </div>
            <span style={{color:"var(--muted)",fontSize:18}}>›</span>
          </div>
        );
      })}
      <div className="premium-banner">
        <span style={{fontSize:24}}>👑</span>
        <div className="premium-info">
          <div className="premium-title">{tx.premiumTitle}</div>
          <div className="premium-sub">{tx.premiumSub}</div>
        </div>
        <span className="premium-manage">{tx.manage}</span>
      </div>
      <button className="logout-btn" onClick={onLogout}>{tx.logout}</button>
    </div>
  );
}

function OnboardingScreen({ tx, lang, setLang, onboardStep, setOnboardStep, navigate, selectedCountry, setSelectedCountry }) {
  return (
    <div className="onboard fade-in">
      <div className="progress-dots">
        {[0,1,2,3].map(i => <div key={i} className={`progress-dot${i===onboardStep?" active":""}`} style={i===onboardStep?{width:24}:{width:8}} />)}
      </div>
      {onboardStep===0 && (
        <>
          <div className="onboard-title">{lang==="bn"?"স্বাগতম 🙏":"Welcome 🙏"}</div>
          <div className="onboard-sub">{lang==="bn"?"কি কথায় আপনাকে স্বাগত জানাই":"Welcome to Ki Kotha"}</div>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:52,color:"var(--text)",fontWeight:700,letterSpacing:"-2px"}}>Ki Kotha</div>
            <div style={{fontFamily:"var(--font-bn)",fontSize:22,color:"var(--text2)",marginTop:4}}>কি কথা</div>
            <div style={{fontSize:13,color:"var(--muted)",fontFamily:"var(--font-bn)",marginTop:12,lineHeight:1.6}}>{tx.taglineSub}</div>
          </div>
          <button className="continue-btn" onClick={() => setOnboardStep(1)}>{tx.continueBtn}</button>
        </>
      )}
      {onboardStep===1 && (
        <>
          <div className="onboard-title">{tx.where}</div>
          <div className="onboard-sub">{tx.personalizeSub}</div>
          <div className="country-grid">
            {ONBOARD_COUNTRIES.map((c,i) => (
              <div key={i} className={`country-card${selectedCountry===i?" selected":""}`} onClick={() => setSelectedCountry(i)}>
                <span className="country-flag">{c.flag}</span>
                <div className="country-name">{lang==="bn"?c.bn:c.en}</div>
              </div>
            ))}
          </div>
          <button className="continue-btn" onClick={() => setOnboardStep(2)}>{tx.continueBtn}</button>
          <div className="step-label">{tx.step(2,4)}</div>
        </>
      )}
      {onboardStep===2 && (
        <>
          <div className="onboard-title">{lang==="bn"?"আপনি কেন এখানে?":"What brings you here?"}</div>
          <div className="onboard-sub">{lang==="bn"?"একাধিক বেছে নিতে পারেন":"Select all that apply"}</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
            {[["✈️",lang==="bn"?"অভিবাসন":"Immigration"],["💼",lang==="bn"?"চাকরি":"Jobs"],["🌍",lang==="bn"?"সম্প্রদায়":"Community"],["📰",lang==="bn"?"খবর":"News"],["👨‍👩‍👧",lang==="bn"?"পরিবার":"Family & Visa"]].map(([icon,label],i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",background:"var(--card2)",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",cursor:"pointer"}}>
                <span style={{fontSize:22}}>{icon}</span>
                <span style={{fontSize:13,fontFamily:"var(--font-bn)",color:"var(--text)"}}>{label}</span>
              </div>
            ))}
          </div>
          <button className="continue-btn" onClick={() => setOnboardStep(3)}>{tx.continueBtn}</button>
          <div className="step-label">{tx.step(3,4)}</div>
        </>
      )}
      {onboardStep===3 && (
        <>
          <div className="onboard-title">{lang==="bn"?"ভাষা বেছে নিন":"Choose your language"}</div>
          <div className="onboard-sub">{lang==="bn"?"যেকোনো সময় পরিবর্তন করা যাবে":"You can change this anytime"}</div>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
            {[["English","en"],["বাংলা","bn"]].map(([label,code]) => (
              <button key={code} style={{padding:"18px",background:lang===code?"var(--card3)":"var(--card2)",border:`1px solid ${lang===code?"var(--border2)":"var(--border)"}`,borderRadius:"var(--radius)",color:lang===code?"var(--text)":"var(--text2)",fontSize:16,fontFamily:"var(--font-bn)",fontWeight:600,cursor:"pointer"}} onClick={() => setLang(code)}>{label}</button>
            ))}
          </div>
          <button className="continue-btn" onClick={() => navigate("home", "forward")}>{lang==="bn"?"শুরু করুন →":"Get Started →"}</button>
          <div className="step-label">{tx.step(4,4)}</div>
        </>
      )}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem("kk_email"));
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("home");
  const [navDir, setNavDir] = useState("none");
  const [screenKey, setScreenKey] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedKotha, setSelectedKotha] = useState(null);
  const [selectedKothaCountry, setSelectedKothaCountry] = useState(null);
  const [onboardStep, setOnboardStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(1);
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [joinedKothas, setJoinedKothas] = useState(["immigration","lifeabroad","canada"]);
  const topRef = useRef(null);
  const tx = T[lang];

  const navigate = useCallback((newScreen, dir = "forward") => {
    setNavDir(dir);
    setScreen(newScreen);
    setScreenKey(k => k + 1);
    if (topRef.current) topRef.current.scrollTop = 0;
  }, []);

  const handleAuth = useCallback((email) => {
    setUser(email);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("kk_email");
    localStorage.removeItem("kk_name");
    setUser(null);
  }, []);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setAiThinking(true);
    setAiResponse(null);
    const resp = await askAI(question, lang);
    setAiThinking(false);
    setAiResponse(resp);
    setQuestion("");
  };

  const toggleSave = (id) => setSavedPosts(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
  const toggleJoin = (kid) => setJoinedKothas(p => p.includes(kid) ? p.filter(x=>x!==kid) : [...p,kid]);

  const handleSelectPost = useCallback((post) => {
    setSelectedPost(post);
    setAiResponse(null);
    navigate("post");
  }, [navigate]);

  // Kotha tree: immigration → country list; others → feed directly
  const handleSelectKotha = useCallback((kothaId) => {
    setSelectedKotha(kothaId);
    setSelectedKothaCountry(null);
    if (kothaId === "immigration") {
      navigate("kotha-countries");
    } else {
      navigate("feed");
    }
  }, [navigate]);

  const handleSelectCountry = useCallback((country) => {
    setSelectedKothaCountry(country);
    navigate("feed");
  }, [navigate]);

  const handleBack = useCallback(() => {
    if (screen === "post") {
      setSelectedPost(null);
      navigate("feed", "back");
    } else if (screen === "feed") {
      if (selectedKothaCountry) {
        setSelectedKothaCountry(null);
        navigate("kotha-countries", "back");
      } else if (selectedKotha) {
        setSelectedKotha(null);
        navigate("communities", "back");
      } else {
        navigate("home", "back");
      }
    } else if (screen === "kotha-countries") {
      setSelectedKotha(null);
      navigate("communities", "back");
    } else {
      navigate("home", "back");
    }
  }, [screen, selectedKotha, selectedKothaCountry, navigate]);

  // Auth gate
  if (!user) {
    return (
      <>
        <style>{css}</style>
        <div className="phone">
          <AuthScreen onAuth={handleAuth} />
        </div>
      </>
    );
  }

  const navItems = [
    { id:"home",        label:tx.home },
    { id:"feed",        label:tx.feed },
    { id:"communities", label:tx.communities },
    { id:"saved",       label:tx.saved },
    { id:"profile",     label:tx.profile },
  ];

  const isDeepScreen = ["post","feed","kotha-countries"].includes(screen);
  const isFeedActive = screen === "feed" || screen === "post" || screen === "kotha-countries";

  const getTopBarKotha = () => {
    if (screen === "post" && selectedPost) return `k/${tx.k[selectedPost.kotha]}`;
    if (screen === "kotha-countries") return `k/${tx.k[selectedKotha]}`;
    if (screen === "feed" && selectedKotha) {
      if (selectedKothaCountry) return `${selectedKothaCountry.flag} ${lang==="bn"?selectedKothaCountry.bn:selectedKothaCountry.en}`;
      return `k/${tx.k[selectedKotha]}`;
    }
    return null;
  };
  const kothaTitle = getTopBarKotha();

  return (
    <>
      <style>{css}</style>
      <div className="phone">
        {screen !== "onboarding" && (
          <div className="top-bar">
            {isDeepScreen
              ? <button className="icon-btn" style={{fontSize:20,color:"var(--text2)"}} onClick={handleBack}>←</button>
              : <div className="logo">{tx.brand}<span>{tx.brandBn}</span></div>
            }
            {kothaTitle
              ? <span className="kotha-title">{kothaTitle}</span>
              : !isDeepScreen && <span style={{width:40}} />
            }
            <div className="actions">
              <button className="icon-btn">🔍</button>
              <button className="lang-btn" onClick={() => setLang(l => l==="en"?"bn":"en")}>{tx.langToggle}</button>
            </div>
          </div>
        )}

        <div key={screenKey} className={`screen slide-${navDir}`} ref={topRef}>
          {screen === "onboarding"      && <OnboardingScreen tx={tx} lang={lang} setLang={setLang} onboardStep={onboardStep} setOnboardStep={setOnboardStep} navigate={navigate} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />}
          {screen === "home"            && <HomeScreen tx={tx} lang={lang} navigate={navigate} joinedKothas={joinedKothas} onSelectPost={handleSelectPost} onSelectKotha={handleSelectKotha} />}
          {screen === "feed"            && <FeedScreen tx={tx} lang={lang} selectedKotha={selectedKotha} selectedKothaCountry={selectedKothaCountry} joinedKothas={joinedKothas} activeFilter={activeFilter} setActiveFilter={setActiveFilter} question={question} setQuestion={setQuestion} handleAsk={handleAsk} aiThinking={aiThinking} aiResponse={aiResponse} feedbackGiven={feedbackGiven} setFeedbackGiven={setFeedbackGiven} toggleJoin={toggleJoin} onSelectPost={handleSelectPost} />}
          {screen === "kotha-countries" && <KothaCountriesScreen tx={tx} lang={lang} onSelectCountry={handleSelectCountry} />}
          {screen === "communities"     && <CommunitiesScreen tx={tx} lang={lang} joinedKothas={joinedKothas} onSelectKotha={handleSelectKotha} />}
          {screen === "post"            && <PostDetailScreen tx={tx} lang={lang} selectedPost={selectedPost} savedPosts={savedPosts} toggleSave={toggleSave} question={question} setQuestion={setQuestion} handleAsk={handleAsk} aiThinking={aiThinking} aiResponse={aiResponse} />}
          {screen === "saved"           && <SavedScreen lang={lang} savedPosts={savedPosts} tx={tx} onSelectPost={handleSelectPost} />}
          {screen === "profile"         && <ProfileScreen tx={tx} lang={lang} onSelectKotha={handleSelectKotha} onLogout={handleLogout} user={user} />}
        </div>

        {screen !== "onboarding" && (
          <div className="bottom-nav">
            {navItems.map(item => {
              const isActive = screen === item.id || (isFeedActive && item.id === "feed");
              return (
                <button key={item.id} className={`nav-item${isActive?" active":""}`}
                  onClick={() => {
                    setSelectedKotha(null);
                    setSelectedPost(null);
                    setSelectedKothaCountry(null);
                    navigate(item.id, "none");
                  }}>
                  <NavIcon id={item.id} active={isActive} />
                  <span className="nav-label">{item.label}</span>
                  {isActive && <div className="nav-dot" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
