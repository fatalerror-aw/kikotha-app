import React, { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  en: {
    brand: "Ki Kotha", brandBn: "কি কথা", tagline: "What's the talk?",
    taglineSub: "The global Bangladeshi community platform — trusted, bilingual, AI-powered.",
    explore: "Explore Communities →", trending: "🔥 Trending Now", seeAll: "See all",
    home: "Home", search: "Search", communities: "Communities", saved: "Saved", profile: "Profile",
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
    services: "Services", vault: "Vault", vaultSub: "Secure document storage",
    trustedHands: "Trusted Hands", trustedHandsSub: "Verified professionals",
    remittance: "Remittance Radar", remittanceSub: "Best rates right now",
    uploadDoc: "Upload Document", noVaultDocs: "No documents saved yet",
    findPro: "Find a Professional", noTrustedHands: "Coming soon in your area",
    sendMoney: "Send Money",
    karma: "Karma", activeIn: "Active In", kothaCount: (n) => `${n} Kothas joined`,
    achievements: (n) => `${n} achievements`, addSocialLink: "Add Social Link",
    tabPosts: "Posts", tabComments: "Comments", tabAbout: "About",
    noPosts: "No posts yet", noComments: "No comments yet",
    myAccount: "My Account", history: "History", drafts: "Drafts",
    onlineStatus: "Online Status", customFeed: "Add to custom feed",
    profileCuration: "Profile curation", settings: "Settings",
    accountSettings: "Account Settings", appSettings: "App Settings",
    acctBasics: "ACCOUNT BASICS", emailAddress: "Email Address",
    updatePassword: "Update Password", phoneNumber: "Phone Number",
    locationRegion: "Location & Region", locationNone: "No location set",
    genderIdentity: "Gender Identity",
    linkedAccounts: "LINKED ACCOUNTS", unlink: "Unlink", link: "Link",
    safetyPrivacy: "SAFETY & PRIVACY", blockedAccounts: "Blocked Accounts",
    mutedCommunities: "Muted Communities", chatMessaging: "Chat & Messaging",
    allowFollow: "Let others follow you", showFollowerCount: "Show follower count publicly",
    privacyControls: "PRIVACY CONTROLS", manageVisibility: "Manage Profile Visibility",
    feedRecommendations: "Feed Recommendations",
    externalSearch: "Appear in External Search", personalizedAds: "Personalized Advertising",
    accessibility: "ACCESSIBILITY", mediaAnimations: "Media & Animations",
    textSize: "Text Size", subtitlesCaptions: "Subtitles & Captions",
    display: "DISPLAY", darkMode: "Dark Mode", notifSound: "Notification Sound",
    autoplayVideos: "Autoplay Videos",
    advanced: "ADVANCED", saveImageSource: "Save Image Source",
    muteVideoDefault: "Mute Videos by Default", quickCommentJump: "Quick Comment Jump",
    recentCommunities: "Recent Communities", defaultCommentSort: "Default Comment Sort",
    sortTop: "Top",
    about: "ABOUT", guidelines: "Ki Kotha Guidelines", privacyPolicy: "Privacy Policy",
    userAgreement: "User Agreement", acknowledgements: "Acknowledgements",
    support: "SUPPORT", helpCenter: "Help Center", reportBug: "Report a Bug",
    reportIssue: "Report an Issue", deleteAccount: "Delete Account",
    version: "Ki Kotha 1.0.0",
    newPost: "New Post", selectKotha: "Select a Kotha", kothaRequired: "Please select a Kotha",
    postTitleLabel: "Title", postTitlePlaceholder: "What's the talk?",
    postBodyLabel: "Body", postBodyPlaceholder: "Share more details with the community...",
    postLangLabel: "Post language", postLangEn: "English", postLangBn: "বাংলা",
    postSubmit: "Post", posting: "Posting...", postErrorMsg: "Failed to post. Please try again.",
    titleRequired: "Title is required", bodyRequired: "Body must be at least 10 characters",
    chooseCountry: "Choose a destination", signIn: "Sign In", signUp: "Sign Up",
    emailLabel: "Email", passwordLabel: "Password", nameLabel: "Full name",
    createAccount: "Create Account", authTagline: "The global Bangladeshi community",
    k: { immigration: "Immigration", fraudwatch: "Fraud Watch", jobscareer: "Jobs & Career", lifeabroad: "Life Abroad", gcccorner: "GCC Corner", canada: "Canada", uk: "United Kingdom", familyvisa: "Family & Visa", students: "Students", bangladeshnews: "Bangladesh News" },
  },
  bn: {
    brand: "কি কথা", brandBn: "Ki Kotha", tagline: "কি কথা বলছেন?",
    taglineSub: "বিশ্বব্যাপী বাংলাদেশি সম্প্রদায়ের প্ল্যাটফর্ম — বিশ্বস্ত, দ্বিভাষিক, AI-চালিত।",
    explore: "সম্প্রদায় দেখুন →", trending: "🔥 এখন ট্রেন্ডিং", seeAll: "সব দেখুন",
    home: "হোম", search: "খুঁজুন", communities: "কমিউনিটি", saved: "সংরক্ষিত", profile: "প্রোফাইল",
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
    services: "সেবাসমূহ", vault: "ভল্ট", vaultSub: "নিরাপদ ডকুমেন্ট স্টোরেজ",
    trustedHands: "বিশ্বস্ত হাত", trustedHandsSub: "যাচাইকৃত পেশাদার",
    remittance: "রেমিট্যান্স রাডার", remittanceSub: "এখনকার সেরা রেট",
    uploadDoc: "ডকুমেন্ট আপলোড", noVaultDocs: "কোনো ডকুমেন্ট নেই",
    findPro: "পেশাদার খুঁজুন", noTrustedHands: "আপনার এলাকায় শীঘ্রই আসছে",
    sendMoney: "টাকা পাঠান",
    karma: "কর্ম", activeIn: "সক্রিয়", kothaCount: (n) => `${n}টি কোথায় যোগ দিয়েছেন`,
    achievements: (n) => `${n}টি অর্জন`, addSocialLink: "সোশ্যাল লিঙ্ক যোগ করুন",
    tabPosts: "পোস্ট", tabComments: "মন্তব্য", tabAbout: "সম্পর্কে",
    noPosts: "কোনো পোস্ট নেই", noComments: "কোনো মন্তব্য নেই",
    myAccount: "আমার অ্যাকাউন্ট", history: "ইতিহাস", drafts: "ড্রাফট",
    onlineStatus: "অনলাইন স্ট্যাটাস", customFeed: "কাস্টম ফিডে যোগ করুন",
    profileCuration: "প্রোফাইল কিউরেশন", settings: "সেটিংস",
    accountSettings: "অ্যাকাউন্ট সেটিংস", appSettings: "অ্যাপ সেটিংস",
    acctBasics: "অ্যাকাউন্ট বেসিক", emailAddress: "ইমেইল ঠিকানা",
    updatePassword: "পাসওয়ার্ড আপডেট", phoneNumber: "ফোন নম্বর",
    locationRegion: "অবস্থান ও অঞ্চল", locationNone: "কোনো অবস্থান নেই",
    genderIdentity: "লিঙ্গ পরিচয়",
    linkedAccounts: "লিঙ্কড অ্যাকাউন্ট", unlink: "আনলিঙ্ক", link: "লিঙ্ক",
    safetyPrivacy: "নিরাপত্তা ও গোপনীয়তা", blockedAccounts: "ব্লকড অ্যাকাউন্ট",
    mutedCommunities: "মিউটড সম্প্রদায়", chatMessaging: "চ্যাট ও মেসেজিং",
    allowFollow: "অন্যরা অনুসরণ করতে পারবে", showFollowerCount: "অনুসরণকারী সংখ্যা দেখাবে",
    privacyControls: "গোপনীয়তা নিয়ন্ত্রণ", manageVisibility: "প্রোফাইল দৃশ্যমানতা",
    feedRecommendations: "ফিড সুপারিশ",
    externalSearch: "বাহ্যিক সার্চে দেখাবে", personalizedAds: "ব্যক্তিগতকৃত বিজ্ঞাপন",
    accessibility: "অ্যাক্সেসিবিলিটি", mediaAnimations: "মিডিয়া ও অ্যানিমেশন",
    textSize: "টেক্সট সাইজ", subtitlesCaptions: "সাবটাইটেল ও ক্যাপশন",
    display: "ডিসপ্লে", darkMode: "ডার্ক মোড", notifSound: "নোটিফিকেশন সাউন্ড",
    autoplayVideos: "অটোপ্লে ভিডিও",
    advanced: "অ্যাডভান্সড", saveImageSource: "ইমেজ সোর্স সেভ করুন",
    muteVideoDefault: "ডিফল্টে ভিডিও মিউট", quickCommentJump: "দ্রুত মন্তব্যে যান",
    recentCommunities: "সাম্প্রতিক সম্প্রদায়", defaultCommentSort: "ডিফল্ট মন্তব্য সাজানো",
    sortTop: "শীর্ষ",
    about: "সম্পর্কে", guidelines: "কি কথা নির্দেশিকা", privacyPolicy: "গোপনীয়তা নীতি",
    userAgreement: "ব্যবহারকারী চুক্তি", acknowledgements: "স্বীকৃতি",
    support: "সহায়তা", helpCenter: "সাহায্য কেন্দ্র", reportBug: "বাগ রিপোর্ট",
    reportIssue: "সমস্যা রিপোর্ট", deleteAccount: "অ্যাকাউন্ট মুছুন",
    version: "কি কথা ১.০.০",
    newPost: "নতুন পোস্ট", selectKotha: "একটি কোথা বেছে নিন", kothaRequired: "দয়া করে একটি কোথা বেছে নিন",
    postTitleLabel: "শিরোনাম", postTitlePlaceholder: "কি কথা?",
    postBodyLabel: "বিবরণ", postBodyPlaceholder: "সম্প্রদায়ের সাথে আরও বিস্তারিত শেয়ার করুন...",
    postLangLabel: "পোস্টের ভাষা", postLangEn: "English", postLangBn: "বাংলা",
    postSubmit: "পোস্ট করুন", posting: "পোস্ট হচ্ছে...", postErrorMsg: "পোস্ট করা সম্ভব হয়নি। আবার চেষ্টা করুন।",
    titleRequired: "শিরোনাম প্রয়োজন", bodyRequired: "বিবরণ কমপক্ষে ১০ অক্ষর হতে হবে",
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

  /* Search */
  .search-box{padding:12px 12px 6px;}
  .search-input{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--text);font-size:14px;font-family:var(--font-body);padding:12px 14px;border-radius:14px;outline:none;transition:border-color 0.2s;}
  .search-input:focus{border-color:#555;}
  .search-input::placeholder{color:var(--muted2);}

  /* Edit profile */
  .edit-profile-form{margin:0 12px 12px;padding:16px;background:var(--card);border:1px solid var(--border2);border-radius:var(--radius);}
  .edit-input{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--text);font-size:13px;font-family:var(--font-body);padding:11px 13px;border-radius:10px;outline:none;margin-bottom:10px;transition:border-color 0.2s;}
  .edit-input:focus{border-color:#555;}
  .edit-input::placeholder{color:var(--muted2);}
  .edit-btns{display:flex;gap:8px;}
  .edit-save{flex:1;padding:11px;background:var(--text);color:#0A0A0A;font-size:13px;font-weight:700;border:none;border-radius:10px;cursor:pointer;font-family:var(--font-body);}
  .edit-cancel{flex:1;padding:11px;background:none;color:var(--muted);font-size:13px;border:1px solid var(--border2);border-radius:10px;cursor:pointer;font-family:var(--font-body);}
  .edit-profile-btn{margin-top:10px;background:none;border:1px solid var(--border2);color:var(--text2);font-size:11px;padding:6px 14px;border-radius:20px;cursor:pointer;font-family:var(--font-body);}

  /* Empty state */
  .empty-state{padding:60px 20px;text-align:center;}
  .empty-icon{font-size:48px;margin-bottom:12px;}
  .empty-text{font-size:14px;color:var(--muted);font-family:var(--font-bn);}

  /* FAB */
  .fab{position:fixed;bottom:88px;right:16px;width:52px;height:52px;border-radius:50%;background:var(--gold);border:none;color:#0A0A0A;font-size:28px;font-weight:300;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:90;box-shadow:0 4px 20px rgba(184,150,46,0.45);line-height:1;transition:transform 0.15s;}
  .fab:active{transform:scale(0.92);}

  /* Create Post */
  .create-post-form{padding:16px 16px 32px;}
  .create-post-label{font-size:11px;font-weight:600;letter-spacing:0.5px;color:var(--text2);font-family:var(--font-body);margin-bottom:6px;display:block;margin-top:4px;}
  .create-post-select{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--text);font-size:14px;font-family:var(--font-bn);padding:12px 14px;border-radius:12px;outline:none;margin-bottom:16px;appearance:none;-webkit-appearance:none;cursor:pointer;}
  .create-post-select:focus{border-color:var(--gold-border);}
  .create-post-input{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--text);font-size:14px;font-family:var(--font-bn);padding:12px 14px;border-radius:12px;outline:none;transition:border-color 0.2s;}
  .create-post-input:focus{border-color:var(--gold-border);}
  .create-post-input::placeholder{color:var(--muted2);}
  .create-post-textarea{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--text);font-size:14px;font-family:var(--font-bn);padding:12px 14px;border-radius:12px;outline:none;resize:none;line-height:1.6;transition:border-color 0.2s;}
  .create-post-textarea:focus{border-color:var(--gold-border);}
  .create-post-textarea::placeholder{color:var(--muted2);}
  .char-count{font-size:10px;color:var(--muted2);text-align:right;margin-bottom:16px;margin-top:4px;font-family:var(--font-body);}
  .char-count.warn{color:#E57373;}
  .lang-toggle-row{display:flex;gap:8px;margin-bottom:20px;}
  .lang-toggle-btn{flex:1;padding:10px;background:var(--card3);border:1px solid var(--border2);color:var(--muted);font-size:13px;font-family:var(--font-bn);border-radius:10px;cursor:pointer;transition:all 0.15s;}
  .lang-toggle-btn.active{background:var(--gold-dim);border-color:var(--gold-border);color:var(--gold2);}
  .post-submit-btn{width:100%;padding:14px;background:var(--gold);color:#0A0A0A;font-size:15px;font-weight:700;border:none;border-radius:14px;cursor:pointer;font-family:var(--font-body);transition:opacity 0.2s;margin-top:4px;}
  .post-submit-btn:disabled{opacity:0.35;cursor:default;}
  .post-error{font-size:12px;color:#E57373;margin-bottom:14px;font-family:var(--font-bn);padding:10px 12px;background:#1A0A0A;border-radius:8px;border:1px solid #3A1A1A;}

  /* Services */
  .service-card{display:flex;align-items:center;gap:14px;margin:0 10px 8px;padding:16px 14px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:background 0.15s;}
  .service-card:active{background:var(--card3);}
  .service-icon{font-size:28px;flex-shrink:0;}
  .service-info{flex:1;}
  .service-title{font-size:14px;font-weight:600;color:var(--text);font-family:var(--font-bn);}
  .service-sub{font-size:11px;color:var(--muted);font-family:var(--font-bn);margin-top:2px;}

  /* Profile v2 */
  .prof-cover{height:180px;background:linear-gradient(160deg,#1A1A1A 0%,#0D0D0D 100%);position:relative;flex-shrink:0;}
  .prof-cover-menu{position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,0.5);border:1px solid var(--border2);color:var(--text2);font-size:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
  .prof-avatar-wrap{position:absolute;bottom:-26px;left:16px;width:64px;height:64px;border-radius:50%;background:var(--card3);border:3px solid var(--bg);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:var(--text);}
  .prof-header{padding:34px 16px 12px;display:flex;align-items:flex-start;justify-content:space-between;}
  .prof-name{font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--text);}
  .prof-edit-btn{background:none;border:1px solid var(--border2);color:var(--text2);font-size:11px;padding:5px 12px;border-radius:16px;cursor:pointer;font-family:var(--font-body);white-space:nowrap;margin-top:2px;}
  .prof-username{font-size:11px;color:var(--muted);font-family:var(--font-bn);margin-top:1px;}
  .prof-kothas{font-size:11px;color:var(--muted);font-family:var(--font-bn);margin-top:3px;}
  .prof-actions-row{display:flex;gap:8px;padding:0 16px 14px;}
  .prof-action-btn{flex:1;padding:8px 4px;background:var(--card3);border:1px solid var(--border2);color:var(--text2);font-size:11px;font-family:var(--font-bn);border-radius:10px;cursor:pointer;text-align:center;}
  .prof-stats-row{display:flex;gap:6px;padding:0 16px 14px;overflow-x:auto;}
  .prof-stats-row::-webkit-scrollbar{display:none;}
  .prof-stat-pill{flex-shrink:0;background:var(--card3);border:1px solid var(--border);border-radius:10px;padding:7px 12px;text-align:center;}
  .prof-stat-val{font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--text);}
  .prof-stat-label{font-size:9px;color:var(--muted);font-family:var(--font-bn);margin-top:1px;}
  .prof-tabs{display:flex;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  .prof-tab{flex:1;padding:12px 4px;text-align:center;font-size:12px;font-family:var(--font-bn);color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;}
  .prof-tab.active{color:var(--gold);border-bottom-color:var(--gold);}

  /* Bottom sheet */
  .sheet-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:200;display:flex;align-items:flex-end;}
  .sheet{width:100%;background:#161616;border-radius:20px 20px 0 0;border-top:1px solid var(--border2);padding-bottom:env(safe-area-inset-bottom,16px);}
  .sheet-handle{width:36px;height:4px;border-radius:2px;background:var(--muted2);margin:12px auto 0;}
  .sheet-title{font-size:14px;font-weight:600;color:var(--text2);font-family:var(--font-bn);text-align:center;padding:10px 0 4px;}
  .sheet-item{display:flex;align-items:center;gap:14px;padding:14px 20px;cursor:pointer;border-top:1px solid var(--border);}
  .sheet-item:active{background:var(--card3);}
  .sheet-item-icon{font-size:20px;width:24px;text-align:center;}
  .sheet-item-label{font-size:14px;color:var(--text);font-family:var(--font-bn);flex:1;}
  .sheet-toggle{width:44px;height:24px;border-radius:12px;border:none;cursor:pointer;position:relative;transition:background 0.2s;flex-shrink:0;}
  .sheet-toggle.on{background:var(--gold);}
  .sheet-toggle.off{background:var(--muted2);}
  .sheet-toggle-knob{position:absolute;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:left 0.2s;}
  .sheet-toggle.on .sheet-toggle-knob{left:23px;}
  .sheet-toggle.off .sheet-toggle-knob{left:3px;}

  /* Account / App Settings */
  .settings-section-hdr{padding:20px 16px 6px;font-size:10px;font-weight:700;letter-spacing:0.8px;color:var(--muted);font-family:var(--font-body);}
  .settings-row{display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid var(--border);cursor:pointer;background:var(--card);}
  .settings-row:active{background:var(--card3);}
  .settings-row-label{flex:1;font-size:13px;color:var(--text);font-family:var(--font-bn);}
  .settings-row-sub{font-size:11px;color:var(--muted);font-family:var(--font-bn);margin-top:1px;}
  .settings-row-val{font-size:12px;color:var(--text2);font-family:var(--font-bn);}
  .settings-row-arrow{font-size:16px;color:var(--muted);}
  .settings-toggle{width:42px;height:24px;border-radius:12px;border:none;cursor:pointer;position:relative;transition:background 0.2s;flex-shrink:0;}
  .settings-toggle.on{background:var(--gold);}
  .settings-toggle.off{background:var(--muted2);}
  .settings-toggle.locked{background:var(--gold);opacity:0.5;cursor:default;}
  .settings-toggle-knob{position:absolute;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:left 0.2s;}
  .settings-toggle.on .settings-toggle-knob,.settings-toggle.locked .settings-toggle-knob{left:21px;}
  .settings-toggle.off .settings-toggle-knob{left:3px;}
  .settings-new-badge{font-size:9px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold2);padding:1px 6px;border-radius:6px;font-family:var(--font-body);font-weight:700;}
  .settings-delete{color:#E57373;}
  .settings-version{text-align:center;padding:20px;font-size:11px;color:var(--muted2);font-family:var(--font-body);}
  .settings-link-btn{font-size:11px;padding:4px 10px;border-radius:8px;border:1px solid var(--border2);background:var(--card3);color:var(--text2);cursor:pointer;font-family:var(--font-body);}
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

function usePosts(kothaId = null) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);
  const refetch = () => setTick(t => t + 1);
  useEffect(() => {
    setLoading(true);
    let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (kothaId) query = query.eq("kotha_id", kothaId);
    query.then(({ data, error }) => {
      if (!error && data) setPosts(data);
      setLoading(false);
    });
  }, [kothaId, tick]);
  return { posts, loading, setPosts, refetch };
}

function useComments(postId) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (!postId) return;
    supabase.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: true }).then(({ data }) => { if (data) setComments(data); });
  }, [postId]);
  return { comments, setComments };
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
  if (id === "search") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  );
  if (id === "services") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  );
  if (id === "profile") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
  return null;
}

function AuthScreen() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const switchMode = (m) => { setMode(m); setError(""); };

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (err) setError(err.message);
    // on success, onAuthStateChange in App updates user state automatically
  };

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { display_name: name.trim() } },
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    localStorage.setItem("kk_name", name.trim());
    setSignedUp(true);
  };

  const handleKey = (e) => { if (e.key === "Enter") mode === "signin" ? handleSignIn() : handleSignUp(); };

  if (signedUp) {
    return (
      <div className="auth-screen">
        <div className="auth-logo">
          <div className="auth-brand">Ki Kotha</div>
          <div className="auth-bn">কি কথা</div>
        </div>
        <div className="auth-card" style={{textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:16}}>📬</div>
          <div style={{fontSize:16,fontWeight:700,color:"var(--text)",marginBottom:10,fontFamily:"var(--font-body)"}}>Check your email</div>
          <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.7,fontFamily:"var(--font-bn)"}}>
            We sent a confirmation link to <strong style={{color:"var(--text2)"}}>{email}</strong>. Open it to activate your account, then sign in.
          </div>
          <button className="auth-submit" style={{marginTop:20}} onClick={() => { setSignedUp(false); switchMode("signin"); }}>
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-screen">
      <div className="auth-logo">
        <div className="auth-brand">Ki Kotha</div>
        <div className="auth-bn">কি কথা</div>
        <div className="auth-tagline">The global Bangladeshi community</div>
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab${mode==="signin"?" active":""}`} onClick={() => switchMode("signin")}>Sign In</button>
          <button className={`auth-tab${mode==="signup"?" active":""}`} onClick={() => switchMode("signup")}>Sign Up</button>
        </div>
        {mode === "signup" && (
          <input className="auth-input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKey} autoFocus />
        )}
        <input className="auth-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey} autoFocus={mode==="signin"} />
        <input className="auth-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKey} />
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-submit" onClick={mode === "signin" ? handleSignIn : handleSignUp} disabled={loading}>
          {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}

function PostCard({ post, lang, tx, onSelect }) {
  const title = post.title || (lang==="bn" ? post.titleBn : post.titleEn);
  const name  = post.author_name || (lang==="bn" ? post.nameBn : post.name);
  const av    = post.author_av || post.av || "??";
  const flag  = post.author_flag || post.flag || "🌐";
  const badge = post.author_badge || post.badge || false;
  const type  = lang==="bn" ? tx[`type${typeClass(post.type)}`] || post.type : post.type;
  const tc    = typeClass(post.type);
  return (
    <div className="post-card fade-in" onClick={() => onSelect(post)}>
      <div className="post-meta">
        <div className="avatar">{av}</div>
        <span className="post-author">{flag} {name}{badge && <span className="verified"> ✓</span>}</span>
        <span className="post-kotha">k/{tx.k[post.kotha_id || post.kotha]}</span>
        <span className="post-time">{post.time || new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      <div style={{marginBottom:6}}>
        <span className={`type-badge type-${tc}`}>{type}</span>
      </div>
      <div className="post-title">{title}</div>
      <div className="post-footer">
        <span className="reactions">{post.reactions}</span>
        <span className="comment-count">💬 {post.comment_count || 0}</span>
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

function HomeScreen({ tx, lang, navigate, joinedKothas, onSelectPost, onSelectKotha, onCreatePost }) {
  const { posts, loading } = usePosts();
  return (
    <div className="fade-in">
      <StoryRow joinedKothas={joinedKothas} tx={tx} onSelectKotha={onSelectKotha} />
      <div className="section-hdr">
        <span className="section-title">{tx.trending}</span>
        <span className="section-link" onClick={() => navigate("communities")}>{tx.explore}</span>
      </div>
      {loading && <div style={{padding:"24px",textAlign:"center",color:"var(--muted)",fontFamily:"var(--font-bn)",fontSize:13}}>Loading posts…</div>}
      {!loading && posts.length === 0 && <div style={{padding:"32px 16px",textAlign:"center",color:"var(--muted)",fontFamily:"var(--font-bn)",fontSize:13}}>No posts yet. Be the first to post!</div>}
      {posts.map(p => <PostCard key={p.id} post={p} lang={lang} tx={tx} onSelect={onSelectPost} />)}
      <button className="fab" onClick={() => onCreatePost(null)}>+</button>
    </div>
  );
}

function FeedScreen({ tx, lang, selectedKotha, selectedKothaCountry, joinedKothas, activeFilter, setActiveFilter, question, setQuestion, handleAsk, aiThinking, aiResponse, feedbackGiven, setFeedbackGiven, toggleJoin, onSelectPost, onCreatePost }) {
  const filters = [tx.filterHot, tx.filterNew, tx.filterQ, tx.filterNews, tx.filterWarn];
  const kotha = selectedKotha ? KOTHAS.find(k => k.id === selectedKotha) : null;
  const { posts: feedPosts, loading: feedLoading } = usePosts(selectedKotha);
  const filteredPosts = feedPosts;
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
      <button className="fab" onClick={() => onCreatePost(selectedKotha)}>+</button>
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

function PostDetailScreen({ tx, lang, selectedPost, savedPosts, toggleSave }) {
  const [commentText, setCommentText] = useState("");
  const { comments: localComments, setComments: setLocalComments } = useComments(selectedPost?.id);

  const handleAddComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    const { data: { user } } = await supabase.auth.getUser();
    const newComment = {
      post_id: selectedPost.id,
      author_id: user.id,
      author_name: localStorage.getItem("kk_name") || "Anonymous",
      author_av: "ME",
      author_flag: "🌐",
      author_badge: false,
      body: text,
    };
    const { data, error } = await supabase.from("comments").insert(newComment).select().single();
    if (!error && data) { setLocalComments(prev => [...prev, data]); setCommentText(""); }
  };

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
      {localComments.map((c,i) => (
        <div key={i} className="comment">
          <div className="post-meta">
            <div className="avatar" style={{width:24,height:24,fontSize:9}}>{c.author_av || c.av}</div>
            <span className="post-author" style={{fontSize:11}}>{c.author_flag || c.flag} {c.author_name || (lang==="bn"?c.nameBn:c.name)}{(c.author_badge||c.badge)&&<span className="verified"> ✓</span>}</span>
          </div>
          <div className="comment-text">{c.body || (lang==="bn"?c.textBn:c.textEn)}</div>
          {c.reactions && <div className="comment-react">{c.reactions}</div>}
        </div>
      ))}
      <div className="ask-box" style={{marginTop:8}}>
        <textarea className="ask-textarea" rows={2} placeholder={lang==="bn"?"মন্তব্য লিখুন...":"Add a comment..."} value={commentText} onChange={e => setCommentText(e.target.value)} />
        <button className="ask-submit" onClick={handleAddComment}>{lang==="bn"?"মন্তব্য করুন":"Comment"}</button>
      </div>
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

function SearchScreen({ lang, tx, onSelectPost }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = q
    ? POSTS.filter(p => (p.titleEn + " " + p.titleBn).toLowerCase().includes(q))
    : [];
  return (
    <div className="fade-in">
      <div className="search-box">
        <input
          className="search-input"
          placeholder={lang==="bn" ? "পোস্ট খুঁজুন..." : "Search posts..."}
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>
      {!q && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-text">{lang==="bn" ? "পোস্ট, বিষয়, সম্প্রদায় খুঁজুন" : "Search posts, topics, communities"}</div>
        </div>
      )}
      {q && results.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">😶</div>
          <div className="empty-text">{lang==="bn" ? "কোনো ফলাফল পাওয়া যায়নি" : "No results found"}</div>
        </div>
      )}
      {results.map(p => <PostCard key={p.id} post={p} lang={lang} tx={tx} onSelect={onSelectPost} />)}
    </div>
  );
}

function SettingsToggle({ on, locked, onChange }) {
  const cls = locked ? "locked" : on ? "on" : "off";
  return (
    <button className={`settings-toggle ${cls}`} onClick={() => !locked && onChange(!on)}>
      <div className="settings-toggle-knob" />
    </button>
  );
}

function ProfileScreen({ tx, lang, onSelectKotha, onLogout, user, navigate }) {
  const [displayName, setDisplayName] = useState(() => localStorage.getItem("kk_name") || user || tx.profileName);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const email = localStorage.getItem("kk_email") || user || "";
  const username = email.split("@")[0] || "user";

  const saveEdit = () => {
    const n = editName.trim() || displayName;
    localStorage.setItem("kk_name", n);
    setDisplayName(n);
    setEditing(false);
  };

  const sheetItems = [
    { icon:"🔖", label:tx.saved,          action:() => { setSheetOpen(false); navigate("saved","forward"); } },
    { icon:"🕐", label:tx.history,         action:() => setSheetOpen(false) },
    { icon:"📝", label:tx.drafts,          action:() => setSheetOpen(false) },
    { icon:"🟢", label:tx.onlineStatus,    toggle:true, val:onlineStatus, set:setOnlineStatus },
    { icon:"📌", label:tx.customFeed,      action:() => setSheetOpen(false) },
    { icon:"✨", label:tx.profileCuration, action:() => setSheetOpen(false) },
    { icon:"⚙️", label:tx.settings,        action:() => { setSheetOpen(false); navigate("account-settings","forward"); } },
  ];

  return (
    <div className="fade-in" style={{paddingBottom:80}}>
      {/* Cover */}
      <div className="prof-cover">
        <button className="prof-cover-menu" onClick={() => setSheetOpen(true)}>⋯</button>
        <div className="prof-avatar-wrap">{displayName[0]?.toUpperCase() || "A"}</div>
      </div>

      {/* Header */}
      <div className="prof-header">
        <div>
          {editing ? (
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input
                className="edit-input"
                style={{margin:0,fontSize:14,padding:"6px 10px",width:160}}
                value={editName}
                onChange={e => setEditName(e.target.value)}
                autoFocus
              />
              <button className="edit-save" style={{padding:"6px 14px",fontSize:12}} onClick={saveEdit}>{lang==="bn"?"সেভ":"Save"}</button>
              <button className="edit-cancel" style={{padding:"6px 10px",fontSize:12}} onClick={() => setEditing(false)}>✕</button>
            </div>
          ) : (
            <div className="prof-name">{displayName}</div>
          )}
          <div className="prof-username">@{username}</div>
          <div className="prof-kothas">{tx.kothaCount(3)}</div>
        </div>
        {!editing && (
          <button className="prof-edit-btn" onClick={() => { setEditName(displayName); setEditing(true); }}>
            {lang==="bn"?"সম্পাদনা":"Edit"}
          </button>
        )}
      </div>

      {/* Action row */}
      <div className="prof-actions-row">
        <button className="prof-action-btn">+ {tx.addSocialLink}</button>
        <button className="prof-action-btn">🏅 {tx.achievements(5)}</button>
      </div>

      {/* Stats pills */}
      <div className="prof-stats-row">
        <div className="prof-stat-pill"><div className="prof-stat-val">4.2K</div><div className="prof-stat-label">{tx.karma}</div></div>
        <div className="prof-stat-pill"><div className="prof-stat-val">47</div><div className="prof-stat-label">{tx.postsLabel}</div></div>
        <div className="prof-stat-pill"><div className="prof-stat-val">Mar '26</div><div className="prof-stat-label">{tx.memberSince.split("·")[0].replace("Member since","").trim()}</div></div>
        <div className="prof-stat-pill"><div className="prof-stat-val">3</div><div className="prof-stat-label">{tx.activeIn}</div></div>
      </div>

      {/* Tabs */}
      <div className="prof-tabs">
        {[["posts",tx.tabPosts],["comments",tx.tabComments],["about",tx.tabAbout]].map(([id,label]) => (
          <div key={id} className={`prof-tab${activeTab===id?" active":""}`} onClick={() => setActiveTab(id)}>{label}</div>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "posts" && (
        <div className="empty-state" style={{paddingTop:48}}>
          <div className="empty-icon">📝</div>
          <div className="empty-text">{tx.noPosts}</div>
        </div>
      )}
      {activeTab === "comments" && (
        <div className="empty-state" style={{paddingTop:48}}>
          <div className="empty-icon">💬</div>
          <div className="empty-text">{tx.noComments}</div>
        </div>
      )}
      {activeTab === "about" && (
        <div style={{padding:"16px"}}>
          <div style={{fontSize:12,color:"var(--muted)",fontFamily:"var(--font-bn)",lineHeight:1.7}}>
            {lang==="bn"?"ব্র্যাঞ্চ ম্যানেজার · টরন্টো 🇨🇦":"Branch Manager · Toronto 🇨🇦"}
          </div>
          <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
            <span className="badge-chip">✓ {tx.verified}</span>
            <span className="badge-chip">👑 {tx.premium}</span>
            <span className="badge-chip">🤝 {tx.founding}</span>
          </div>
        </div>
      )}

      <button className="logout-btn" style={{margin:"20px 12px 0",width:"calc(100% - 24px)"}} onClick={onLogout}>{tx.logout}</button>

      {/* Bottom sheet */}
      {sheetOpen && (
        <div className="sheet-overlay" onClick={() => setSheetOpen(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">{tx.myAccount}</div>
            {sheetItems.map((item, i) => (
              <div key={i} className="sheet-item" onClick={item.action || undefined}>
                <span className="sheet-item-icon">{item.icon}</span>
                <span className="sheet-item-label">{item.label}</span>
                {item.toggle && (
                  <button
                    className={`sheet-toggle ${item.val?"on":"off"}`}
                    onClick={e => { e.stopPropagation(); item.set(!item.val); }}
                  >
                    <div className="sheet-toggle-knob" />
                  </button>
                )}
                {!item.toggle && <span style={{color:"var(--muted)",fontSize:16}}>›</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AccountSettingsScreen({ tx, lang, user, navigate }) {
  const email = localStorage.getItem("kk_email") || user || "";
  const [allowFollow, setAllowFollow] = useState(true);
  const [showFollowers, setShowFollowers] = useState(false);
  const [feedRec, setFeedRec] = useState(true);
  const [extSearch, setExtSearch] = useState(true);
  const [persAds, setPersAds] = useState(true);

  const Row = ({ label, sub, val, arrow=true, onTap, toggle, toggleVal, toggleSet, red, linkBtn, linkLabel }) => (
    <div className="settings-row" onClick={onTap}>
      <div style={{flex:1}}>
        <div className={`settings-row-label${red?" settings-delete":""}`}>{label}</div>
        {sub && <div className="settings-row-sub">{sub}</div>}
      </div>
      {val && <span className="settings-row-val">{val}</span>}
      {toggle && <SettingsToggle on={toggleVal} onChange={toggleSet} />}
      {linkBtn && <button className="settings-link-btn">{linkLabel}</button>}
      {arrow && !toggle && !linkBtn && <span className="settings-row-arrow">›</span>}
    </div>
  );

  return (
    <div className="fade-in" style={{paddingBottom:80}}>
      <div style={{padding:"16px",borderBottom:"1px solid var(--border)"}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button
            onClick={() => navigate("app-settings","forward")}
            style={{flex:1,padding:"11px",background:"var(--card3)",border:"1px solid var(--border2)",color:"var(--text2)",fontSize:13,fontFamily:"var(--font-bn)",borderRadius:10,cursor:"pointer",textAlign:"left"}}
          >
            ⚙️ {tx.appSettings} ›
          </button>
        </div>
      </div>

      <div className="settings-section-hdr">{tx.acctBasics}</div>
      <Row label={tx.emailAddress} val={email} />
      <Row label={tx.updatePassword} />
      <Row label={tx.phoneNumber} />
      <Row label={tx.locationRegion} sub={tx.locationNone} />
      <Row label={tx.genderIdentity} />

      <div className="settings-section-hdr">{tx.linkedAccounts}</div>
      <Row label="Google" arrow={false} linkBtn linkLabel={tx.unlink} />
      <Row label="Apple" arrow={false} linkBtn linkLabel={tx.link} />

      <div className="settings-section-hdr">{tx.safetyPrivacy}</div>
      <Row label={tx.blockedAccounts} />
      <Row label={tx.mutedCommunities} />
      <Row label={tx.chatMessaging} />
      <Row label={tx.allowFollow} arrow={false} toggle toggleVal={allowFollow} toggleSet={setAllowFollow} />
      <Row label={tx.showFollowerCount} arrow={false} toggle toggleVal={showFollowers} toggleSet={setShowFollowers} />

      <div className="settings-section-hdr">{tx.privacyControls}</div>
      <Row label={tx.manageVisibility} />
      <Row label={tx.feedRecommendations} arrow={false} toggle toggleVal={feedRec} toggleSet={setFeedRec} />
      <Row label={tx.externalSearch} arrow={false} toggle toggleVal={extSearch} toggleSet={setExtSearch} />
      <Row label={tx.personalizedAds} arrow={false} toggle toggleVal={persAds} toggleSet={setPersAds} />
    </div>
  );
}

function AppSettingsScreen({ tx, lang }) {
  const [notifSound, setNotifSound] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [saveImgSrc, setSaveImgSrc] = useState(true);
  const [muteVid, setMuteVid] = useState(false);
  const [quickComment, setQuickComment] = useState(true);
  const [recentComm, setRecentComm] = useState(true);

  const Row = ({ label, sub, toggle, toggleVal, toggleSet, locked, val, badge, red, arrow=true }) => (
    <div className="settings-row">
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span className={`settings-row-label${red?" settings-delete":""}`}>{label}</span>
          {badge && <span className="settings-new-badge">NEW</span>}
        </div>
        {sub && <div className="settings-row-sub">{sub}</div>}
      </div>
      {val && <span className="settings-row-val">{val}</span>}
      {toggle && <SettingsToggle on={toggleVal} locked={locked} onChange={toggleSet || (()=>{})} />}
      {!toggle && arrow && <span className="settings-row-arrow">›</span>}
    </div>
  );

  return (
    <div className="fade-in" style={{paddingBottom:80}}>
      <div className="settings-section-hdr">{tx.accessibility}</div>
      <Row label={tx.mediaAnimations} />
      <Row label={tx.textSize} />
      <Row label={tx.subtitlesCaptions} badge />

      <div className="settings-section-hdr">{tx.display}</div>
      <Row label={tx.darkMode} toggle toggleVal={true} locked />
      <Row label={tx.notifSound} toggle toggleVal={notifSound} toggleSet={setNotifSound} />
      <Row label={tx.autoplayVideos} toggle toggleVal={autoplay} toggleSet={setAutoplay} />

      <div className="settings-section-hdr">{tx.advanced}</div>
      <Row label={tx.saveImageSource} toggle toggleVal={saveImgSrc} toggleSet={setSaveImgSrc} />
      <Row label={tx.muteVideoDefault} toggle toggleVal={muteVid} toggleSet={setMuteVid} />
      <Row label={tx.quickCommentJump} toggle toggleVal={quickComment} toggleSet={setQuickComment} />
      <Row label={tx.recentCommunities} toggle toggleVal={recentComm} toggleSet={setRecentComm} />
      <Row label={tx.defaultCommentSort} val={tx.sortTop} />

      <div className="settings-section-hdr">{tx.about}</div>
      <Row label={tx.guidelines} />
      <Row label={tx.privacyPolicy} />
      <Row label={tx.userAgreement} />
      <Row label={tx.acknowledgements} />

      <div className="settings-section-hdr">{tx.support}</div>
      <Row label={tx.helpCenter} />
      <Row label={tx.reportBug} />
      <Row label={tx.reportIssue} />
      <Row label={tx.deleteAccount} red />

      <div className="settings-version">{tx.version}</div>
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

function ServicesScreen({ tx, lang, navigate }) {
  const items = [
    { id: "vault",           icon: "🔐", title: tx.vault,        sub: tx.vaultSub },
    { id: "trusted-hands",   icon: "🤝", title: tx.trustedHands, sub: tx.trustedHandsSub },
    { id: "remittance-radar",icon: "💸", title: tx.remittance,   sub: tx.remittanceSub },
  ];
  return (
    <div className="fade-in">
      <div className="section-hdr">
        <span className="section-title">{tx.services}</span>
      </div>
      {items.map(s => (
        <div key={s.id} className="service-card" onClick={() => navigate(s.id, "forward")}>
          <span className="service-icon">{s.icon}</span>
          <div className="service-info">
            <div className="service-title">{s.title}</div>
            <div className="service-sub">{s.sub}</div>
          </div>
          <span style={{color:"var(--muted)",fontSize:20}}>›</span>
        </div>
      ))}
    </div>
  );
}

function VaultScreen({ tx, lang }) {
  return (
    <div className="fade-in">
      <div className="section-hdr">
        <span className="section-title">{tx.vault}</span>
      </div>
      <div className="empty-state">
        <div className="empty-icon">🔐</div>
        <div className="empty-text">{tx.noVaultDocs}</div>
        <button className="hero-btn" style={{marginTop:16}}>{tx.uploadDoc}</button>
      </div>
    </div>
  );
}

function TrustedHandsScreen({ tx, lang }) {
  const providers = [
    { av:"IA", flag:"🇨🇦", name:"Iqbal Ahmed",  role:lang==="bn"?"ইমিগ্রেশন কনসালট্যান্ট":"Immigration Consultant", rating:"⭐ 4.9", reviews:143 },
    { av:"FS", flag:"🇬🇧", name:"Fatema S.",     role:lang==="bn"?"সার্টিফাইড অ্যাকাউন্ট্যান্ট":"Certified Accountant",  rating:"⭐ 4.8", reviews:89 },
    { av:"RH", flag:"🇦🇪", name:"Rafiq H.",      role:lang==="bn"?"ভিসা এজেন্ট":"Visa Agent",                          rating:"⭐ 4.7", reviews:62 },
  ];
  return (
    <div className="fade-in">
      <div className="section-hdr">
        <span className="section-title">{tx.trustedHands}</span>
        <span className="section-link">{tx.findPro}</span>
      </div>
      {providers.map((p, i) => (
        <div key={i} style={{display:"flex",alignItems:"center",gap:12,margin:"0 10px 8px",padding:"14px",background:"var(--card2)",border:"1px solid var(--border)",borderRadius:"var(--radius)",cursor:"pointer"}}>
          <div className="avatar" style={{width:40,height:40,fontSize:14}}>{p.av}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:"var(--text)",fontFamily:"var(--font-bn)"}}>{p.flag} {p.name} <span className="verified">✓</span></div>
            <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-bn)",marginTop:2}}>{p.role}</div>
            <div style={{fontSize:11,color:"var(--text2)",marginTop:3}}>{p.rating} · {p.reviews} {lang==="bn"?"রিভিউ":"reviews"}</div>
          </div>
          <span style={{color:"var(--muted)",fontSize:18}}>›</span>
        </div>
      ))}
    </div>
  );
}

function RemittanceRadarScreen({ tx, lang }) {
  const rates = [
    { provider:"bKash",        flag:"🇧🇩", rate:"85.40", change:"+0.12", good:true },
    { provider:"Western Union", flag:"🌐", rate:"84.90", change:"-0.05", good:false },
    { provider:"Wise",          flag:"🌐", rate:"85.25", change:"+0.08", good:true },
    { provider:"Remitly",       flag:"🌐", rate:"85.10", change:"+0.03", good:true },
  ];
  return (
    <div className="fade-in">
      <div className="section-hdr">
        <span className="section-title">{tx.remittance}</span>
        <span className="section-link">CAD → BDT</span>
      </div>
      <div style={{padding:"0 12px 4px"}}>
        <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--font-bn)",marginBottom:10}}>{lang==="bn"?"১ CAD সমান কত BDT":"1 CAD equals BDT"}</div>
        {rates.map((r, i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 14px",background:"var(--card2)",border:"1px solid var(--border)",borderRadius:14,marginBottom:8}}>
            <span style={{fontSize:22}}>{r.flag}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)",fontFamily:"var(--font-bn)"}}>{r.provider}</div>
              <div style={{fontSize:11,color:r.good?"#4CAF50":"#E57373",marginTop:2}}>{r.change} {lang==="bn"?"আজ":"today"}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:18,fontWeight:700,color:"var(--text)",fontFamily:"var(--font-display)"}}>{r.rate}</div>
              <button style={{fontSize:10,padding:"3px 10px",background:"var(--card3)",border:"1px solid var(--border2)",borderRadius:8,color:"var(--text2)",cursor:"pointer",fontFamily:"var(--font-bn)",marginTop:3}}>{tx.sendMoney}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreatePostScreen({ tx, lang, initialKothaId, navigate, setSelectedKotha }) {
  const [kothaId, setKothaId]   = useState(initialKothaId || "");
  const [title, setTitle]       = useState("");
  const [body, setBody]         = useState("");
  const [postLang, setPostLang] = useState(lang);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState("");

  const titleOk = title.trim().length > 0 && title.length <= 200;
  const bodyOk  = body.trim().length >= 10 && body.length <= 2000;
  const kothaOk = !!kothaId;
  const valid   = titleOk && bodyOk && kothaOk;

  const handleSubmit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");
    const { data: { user: authUser } } = await supabase.auth.getUser();
    const { error: err } = await supabase.from("posts").insert({
      title:    title.trim(),
      body:     body.trim(),
      kotha_id: kothaId,
      user_id:  authUser.id,
      lang:     postLang,
    });
    if (err) {
      setSubmitting(false);
      setError(err.message || tx.postErrorMsg);
      return;
    }
    setSelectedKotha(kothaId);
    navigate("feed", "back");
  };

  return (
    <div className="fade-in create-post-form">
      <label className="create-post-label">{tx.selectKotha} *</label>
      <select className="create-post-select" value={kothaId} onChange={e => setKothaId(e.target.value)}>
        <option value="">{tx.selectKotha}</option>
        {KOTHAS.map(k => <option key={k.id} value={k.id}>{tx.k[k.id]}</option>)}
      </select>

      <label className="create-post-label">{tx.postTitleLabel} *</label>
      <input
        className="create-post-input"
        placeholder={tx.postTitlePlaceholder}
        value={title}
        maxLength={200}
        onChange={e => setTitle(e.target.value)}
      />
      <div className={`char-count${title.length > 180 ? " warn" : ""}`}>{title.length}/200</div>

      <label className="create-post-label">{tx.postBodyLabel} *</label>
      <textarea
        className="create-post-textarea"
        rows={8}
        placeholder={tx.postBodyPlaceholder}
        value={body}
        maxLength={2000}
        onChange={e => setBody(e.target.value)}
      />
      <div className={`char-count${body.length > 1800 ? " warn" : ""}`}>{body.length}/2000</div>

      <label className="create-post-label">{tx.postLangLabel}</label>
      <div className="lang-toggle-row">
        <button className={`lang-toggle-btn${postLang==="en"?" active":""}`} onClick={() => setPostLang("en")}>{tx.postLangEn}</button>
        <button className={`lang-toggle-btn${postLang==="bn"?" active":""}`} onClick={() => setPostLang("bn")}>{tx.postLangBn}</button>
      </div>

      {error && <div className="post-error">{error}</div>}

      <button className="post-submit-btn" onClick={handleSubmit} disabled={!valid || submitting}>
        {submitting ? tx.posting : tx.postSubmit}
      </button>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
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
  const [createPostFromKotha, setCreatePostFromKotha] = useState(null);
  const topRef = useRef(null);
  const tx = T[lang];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u?.email) localStorage.setItem("kk_email", u.email);
      if (u?.user_metadata?.display_name) localStorage.setItem("kk_name", u.user_metadata.display_name);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u?.email) localStorage.setItem("kk_email", u.email);
      if (u?.user_metadata?.display_name) localStorage.setItem("kk_name", u.user_metadata.display_name);
    });
    return () => subscription.unsubscribe();
  }, []);

  const navigate = useCallback((newScreen, dir = "forward") => {
    setNavDir(dir);
    setScreen(newScreen);
    setScreenKey(k => k + 1);
    if (topRef.current) topRef.current.scrollTop = 0;
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("kk_email");
    localStorage.removeItem("kk_name");
    // setUser(null) fires automatically via onAuthStateChange
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

  const handleOpenCreatePost = useCallback((kothaId = null) => {
    setCreatePostFromKotha(kothaId);
    navigate("create-post", "forward");
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
    } else if (["vault","trusted-hands","remittance-radar"].includes(screen)) {
      navigate("services", "back");
    } else if (screen === "search") {
      navigate("home", "back");
    } else if (screen === "account-settings") {
      navigate("profile", "back");
    } else if (screen === "app-settings") {
      navigate("account-settings", "back");
    } else if (screen === "create-post") {
      navigate(createPostFromKotha ? "feed" : "home", "back");
    } else {
      navigate("home", "back");
    }
  }, [screen, selectedKotha, selectedKothaCountry, createPostFromKotha, navigate]);

  // Auth gate
  if (authLoading) {
    return (
      <>
        <style>{css}</style>
        <div className="phone" style={{alignItems:"center",justifyContent:"center"}}>
          <div style={{fontFamily:"var(--font-display)",fontSize:28,color:"var(--muted)",letterSpacing:"-0.5px"}}>Ki Kotha</div>
        </div>
      </>
    );
  }
  if (!user) {
    return (
      <>
        <style>{css}</style>
        <div className="phone">
          <AuthScreen />
        </div>
      </>
    );
  }

  const navItems = [
    { id:"home",        label:tx.home },
    { id:"communities", label:tx.communities },
    { id:"services",    label:tx.services },
    { id:"saved",       label:tx.saved },
    { id:"profile",     label:tx.profile },
  ];

  const isDeepScreen = ["post","feed","kotha-countries","vault","trusted-hands","remittance-radar","search","account-settings","app-settings","create-post"].includes(screen);

  const getTopBarKotha = () => {
    if (screen === "post" && selectedPost) return `k/${tx.k[selectedPost.kotha]}`;
    if (screen === "kotha-countries") return `k/${tx.k[selectedKotha]}`;
    if (screen === "feed" && selectedKotha) {
      if (selectedKothaCountry) return `${selectedKothaCountry.flag} ${lang==="bn"?selectedKothaCountry.bn:selectedKothaCountry.en}`;
      return `k/${tx.k[selectedKotha]}`;
    }
    if (screen === "account-settings") return tx.accountSettings;
    if (screen === "app-settings") return tx.appSettings;
    if (screen === "search") return tx.search;
    if (screen === "create-post") return tx.newPost;
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
              <button className="icon-btn" onClick={() => navigate("search", "forward")}>🔍</button>
              <button className="lang-btn" onClick={() => setLang(l => l==="en"?"bn":"en")}>{tx.langToggle}</button>
            </div>
          </div>
        )}

        <div key={screenKey} className={`screen slide-${navDir}`} ref={topRef}>
          {screen === "onboarding"        && <OnboardingScreen tx={tx} lang={lang} setLang={setLang} onboardStep={onboardStep} setOnboardStep={setOnboardStep} navigate={navigate} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />}
          {screen === "home"              && <HomeScreen tx={tx} lang={lang} navigate={navigate} joinedKothas={joinedKothas} onSelectPost={handleSelectPost} onSelectKotha={handleSelectKotha} onCreatePost={handleOpenCreatePost} />}
          {screen === "search"            && <SearchScreen lang={lang} tx={tx} onSelectPost={handleSelectPost} />}
          {screen === "feed"              && <FeedScreen tx={tx} lang={lang} selectedKotha={selectedKotha} selectedKothaCountry={selectedKothaCountry} joinedKothas={joinedKothas} activeFilter={activeFilter} setActiveFilter={setActiveFilter} question={question} setQuestion={setQuestion} handleAsk={handleAsk} aiThinking={aiThinking} aiResponse={aiResponse} feedbackGiven={feedbackGiven} setFeedbackGiven={setFeedbackGiven} toggleJoin={toggleJoin} onSelectPost={handleSelectPost} onCreatePost={handleOpenCreatePost} />}
          {screen === "create-post"       && <CreatePostScreen tx={tx} lang={lang} initialKothaId={createPostFromKotha} navigate={navigate} setSelectedKotha={setSelectedKotha} />}
          {screen === "kotha-countries"   && <KothaCountriesScreen tx={tx} lang={lang} onSelectCountry={handleSelectCountry} />}
          {screen === "communities"       && <CommunitiesScreen tx={tx} lang={lang} joinedKothas={joinedKothas} onSelectKotha={handleSelectKotha} />}
          {screen === "post"              && <PostDetailScreen tx={tx} lang={lang} selectedPost={selectedPost} savedPosts={savedPosts} toggleSave={toggleSave} />}
          {screen === "saved"             && <SavedScreen lang={lang} savedPosts={savedPosts} tx={tx} onSelectPost={handleSelectPost} />}
          {screen === "profile"           && <ProfileScreen tx={tx} lang={lang} onSelectKotha={handleSelectKotha} onLogout={handleLogout} user={user?.email || ""} navigate={navigate} />}
          {screen === "account-settings"  && <AccountSettingsScreen tx={tx} lang={lang} user={user?.email || ""} navigate={navigate} />}
          {screen === "app-settings"      && <AppSettingsScreen tx={tx} lang={lang} />}
          {screen === "services"          && <ServicesScreen tx={tx} lang={lang} navigate={navigate} />}
          {screen === "vault"             && <VaultScreen tx={tx} lang={lang} />}
          {screen === "trusted-hands"     && <TrustedHandsScreen tx={tx} lang={lang} />}
          {screen === "remittance-radar"  && <RemittanceRadarScreen tx={tx} lang={lang} />}
        </div>

        {screen !== "onboarding" && (
          <div className="bottom-nav">
            {navItems.map(item => {
              const isActive = screen === item.id ||
                (["post","feed","kotha-countries"].includes(screen) && item.id === "communities") ||
                (["vault","trusted-hands","remittance-radar"].includes(screen) && item.id === "services");
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
