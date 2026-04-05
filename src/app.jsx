import { useState, useRef } from “react”;

const T = {
en: {
brand: “Ki Kotha”, brandBn: “কি কথা”, tagline: “What’s the talk?”,
taglineSub: “The global Bangladeshi community platform — trusted, bilingual, AI-powered.”,
explore: “Explore Communities →”, trending: “🔥 Trending Now”, seeAll: “See all”,
home: “Home”, feed: “Feed”, communities: “Communities”, saved: “Saved”, profile: “Profile”,
joinFree: “Join Free”, join: “+ Join”, joined: “✓ Joined”,
where: “Where are you based?”, personalizeSub: “We’ll personalize your Ki Kotha feed”,
continueBtn: “Continue →”, step: (n, t) => `Step ${n} of ${t}`,
kothas: “Kothas”, commCount: “10 communities”, members: “members”, active: “Active now”,
filterHot: “🔥 Hot”, filterNew: “🆕 New”, filterQ: “❓ Questions”, filterNews: “📰 News”, filterWarn: “⚠️ Warnings”,
typeDisc: “Discussion”, typeQ: “Question”, typeNews: “News”, typeWarn: “Warning”,
aiBadge: “🤖  Ki Kotha AI  ·  Pinned Response”,
aiDisclaimer: “Informational only — not legal advice. Always consult a qualified professional.”,
helpful: “Was this helpful?”, yes: “👍 Yes”, no: “👎 No”,
communityAdd: “Community members can reply below ↓”,
commentsHdr: (n) => `${n} Comments`, share: “↗ Share”, back: “←”,
profileName: “Adam Wadud”, profileBio: “Branch Manager · Toronto 🇨🇦”,
memberSince: “Member since March 2026  ·  Founding Member”,
postsLabel: “Posts”, commentsLabel: “Comments”, reactionsLabel: “Reactions”,
joinedKothas: “Kothas Joined”, premiumTitle: “Ki Kotha Premium”,
premiumSub: “Active · Renews April 2027”, manage: “Manage →”,
verified: “Verified”, founding: “Founding”, premium: “Premium”,
sources: “Sources: IRCC.gc.ca · Canada.ca/express-entry”,
askPlaceholder: “Ask a question in this Kotha…”,
postBtn: “Post Question”, thinking: “Ki Kotha AI is researching your question…”,
langToggle: “বাংলা”,
k: { immigration: “Immigration”, fraudwatch: “Fraud Watch”, jobscareer: “Jobs & Career”, lifeabroad: “Life Abroad”, gcccorner: “GCC Corner”, canada: “Canada”, uk: “United Kingdom”, familyvisa: “Family & Visa”, students: “Students”, bangladeshnews: “Bangladesh News” },
},
bn: {
brand: “কি কথা”, brandBn: “Ki Kotha”, tagline: “কি কথা বলছেন?”,
taglineSub: “বিশ্বব্যাপী বাংলাদেশি সম্প্রদায়ের প্ল্যাটফর্ম — বিশ্বস্ত, দ্বিভাষিক, AI-চালিত।”,
explore: “সম্প্রদায় দেখুন →”, trending: “🔥 এখন ট্রেন্ডিং”, seeAll: “সব দেখুন”,
home: “হোম”, feed: “ফিড”, communities: “কমিউনিটি”, saved: “সংরক্ষিত”, profile: “প্রোফাইল”,
joinFree: “যোগ দিন”, join: “+ যোগ দিন”, joined: “✓ যোগ দিয়েছেন”,
where: “আপনি কোথায় আছেন?”, personalizeSub: “আমরা আপনার ফিড কাস্টমাইজ করব”,
continueBtn: “পরবর্তী →”, step: (n, t) => `ধাপ ${n} / ${t}`,
kothas: “কোথা সমূহ”, commCount: “১০টি সম্প্রদায়”, members: “সদস্য”, active: “এখন সক্রিয়”,
filterHot: “🔥 জনপ্রিয়”, filterNew: “🆕 নতুন”, filterQ: “❓ প্রশ্ন”, filterNews: “📰 খবর”, filterWarn: “⚠️ সতর্কতা”,
typeDisc: “আলোচনা”, typeQ: “প্রশ্ন”, typeNews: “খবর”, typeWarn: “সতর্কতা”,
aiBadge: “🤖  কি কথা AI  ·  পিন করা উত্তর”,
aiDisclaimer: “শুধুমাত্র তথ্যমূলক — আইনি পরামর্শ নয়।”,
helpful: “এটা কি সহায়ক ছিল?”, yes: “👍 হ্যাঁ”, no: “👎 না”,
communityAdd: “নিচে সম্প্রদায় উত্তর যোগ করতে পারেন ↓”,
commentsHdr: (n) => `${n}টি মন্তব্য`, share: “↗ শেয়ার”, back: “←”,
profileName: “আদম ওয়াদুদ”, profileBio: “ব্র্যাঞ্চ ম্যানেজার · টরন্টো 🇨🇦”,
memberSince: “সদস্য মার্চ ২০২৬ থেকে  ·  প্রতিষ্ঠাতা সদস্য”,
postsLabel: “পোস্ট”, commentsLabel: “মন্তব্য”, reactionsLabel: “প্রতিক্রিয়া”,
joinedKothas: “যোগ দেওয়া কোথা”, premiumTitle: “কি কথা প্রিমিয়াম”,
premiumSub: “সক্রিয় · নবায়ন এপ্রিল ২০২৭”, manage: “পরিচালনা →”,
verified: “যাচাইকৃত”, founding: “প্রতিষ্ঠাতা”, premium: “প্রিমিয়াম”,
sources: “সূত্র: IRCC.gc.ca · Canada.ca/express-entry”,
askPlaceholder: “এই কোথায় প্রশ্ন করুন…”,
postBtn: “প্রশ্ন পোস্ট করুন”, thinking: “কি কথা AI আপনার প্রশ্ন গবেষণা করছে…”,
langToggle: “English”,
k: { immigration: “অভিবাসন”, fraudwatch: “প্রতারণা সতর্কতা”, jobscareer: “চাকরি ও ক্যারিয়ার”, lifeabroad: “প্রবাসী জীবন”, gcccorner: “জিসিসি কর্নার”, canada: “কানাডা”, uk: “যুক্তরাজ্য”, familyvisa: “পরিবার ও ভিসা”, students: “শিক্ষার্থী”, bangladeshnews: “বাংলাদেশ সংবাদ” },
},
};

const KOTHAS = [
{ id: “immigration”, icon: “✈️”, members: “124,847”, accent: “#B8962E”, joined: true },
{ id: “fraudwatch”,  icon: “🛡️”, members: “89,000”,  accent: “#C0392B”, joined: false },
{ id: “jobscareer”,  icon: “💼”, members: “67,000”,  accent: “#B8962E”, joined: false },
{ id: “lifeabroad”,  icon: “🌍”, members: “54,000”,  accent: “#B8962E”, joined: true },
{ id: “gcccorner”,   icon: “🌙”, members: “112,000”, accent: “#2471A3”, joined: false },
{ id: “canada”,      icon: “🍁”, members: “98,000”,  accent: “#C0392B”, joined: true },
{ id: “uk”,          icon: “🇬🇧”, members: “43,000”,  accent: “#2471A3”, joined: false },
{ id: “familyvisa”,  icon: “👨‍👩‍👧”, members: “38,000”,  accent: “#B8962E”, joined: false },
{ id: “students”,    icon: “🎓”, members: “29,000”,  accent: “#27AE60”, joined: false },
{ id: “bangladeshnews”, icon: “📰”, members: “76,000”, accent: “#B8962E”, joined: false },
];

const POSTS = [
{ id:1, av:“SW”, flag:“🇨🇦”, name:“Shahid W.”, nameBn:“শাহিদ ও.”, badge:true,  kotha:“canada”,      time:“2h”, type:“Discussion”, titleEn:“Got my PR approved — CRS 487, here’s my full timeline and everything that worked”, titleBn:“PR অনুমোদন পেয়েছি — CRS ৪৮৭, আমার সম্পূর্ণ টাইমলাইন”, reactions:“❤️ 203  🎉 67”, comments:88 },
{ id:2, av:“MH”, flag:“🇸🇦”, name:“Mina H.”,   nameBn:“মিনা হো.”, badge:false, kotha:“immigration”, time:“5h”, type:“Question”,   titleEn:“Can I apply for Canada PR while on a Saudi work visa? My employer knows my plans”, titleBn:“কানাডা PR আবেদন কি সৌদি ওয়ার্ক ভিসায় থাকা অবস্থায় করা যাবে?”, reactions:“🤔 45  ❤️ 23”, comments:34 },
{ id:3, av:“RK”, flag:“🇧🇩”, name:“Rahim K.”,  nameBn:“রহিম ক.”,  badge:true,  kotha:“immigration”, time:“8h”, type:“News”,       titleEn:“IRCC announced a new draw — 3,500 ITAs issued, minimum CRS dropped to 481”, titleBn:“IRCC নতুন ড্র ঘোষণা করেছে — ৩,৫০০ ITA, সর্বনিম্ন CRS ৪৮১”, reactions:“🎉 412  ❤️ 289”, comments:156 },
{ id:4, av:“FA”, flag:“🇦🇪”, name:“Farida A.”, nameBn:“ফরিদা আ.”, badge:true,  kotha:“gcccorner”,   time:“1d”, type:“Discussion”, titleEn:“UAE Golden Visa for skilled professionals — complete breakdown for Bangladeshis 2026”, titleBn:“UAE গোল্ডেন ভিসা — বাংলাদেশিদের জন্য সম্পূর্ণ গাইড ২০২৬”, reactions:“❤️ 156  🎉 43”, comments:72 },
{ id:5, av:“TH”, flag:“🇧🇩”, name:“Tariq H.”,  nameBn:“তারিক হো.”, badge:false, kotha:“fraudwatch”,  time:“3h”, type:“Warning”,    titleEn:“⚠️ ALERT: Fake Qatar recruitment agency on Facebook — names inside, please share”, titleBn:“⚠️ সতর্কতা: ভুয়া কাতার রিক্রুটমেন্ট এজেন্সি Facebook-এ সক্রিয়”, reactions:“😡 89  ❤️ 34”, comments:201 },
];

const COMMENTS = [
{ av:“AK”, flag:“🇨🇦”, name:“Arif K.”, nameBn:“আরিফ ক.”, badge:true, textEn:“I can confirm — I applied from UAE on a work visa. Full process took 8 months.”, textBn:“আমি নিশ্চিত করতে পারি — UAE থেকে আবেদন করেছিলাম। মোট ৮ মাস লেগেছিল।”, reactions:“❤️ 34” },
{ av:“SR”, flag:“🇬🇧”, name:“Sara R.”,  nameBn:“সারা র.”,  badge:false, textEn:“Make sure your IELTS is valid for the entire processing period.”, textBn:“নিশ্চিত করুন যে আপনার IELTS প্রক্রিয়াকরণের সময় পর্যন্ত বৈধ থাকে।”, reactions:“❤️ 12” },
{ av:“NK”, flag:“🇧🇩”, name:“Nasrin K.”, nameBn:“নাসরিন ক.”, badge:true, textEn:“Also check your NOC code is valid under TEER — many codes changed in 2023.”, textBn:“আপনার NOC কোড TEER-এর অধীনে বৈধ কিনা চেক করুন।”, reactions:“❤️ 28” },
];

const COUNTRIES = [
{ flag:“🇧🇩”, en:“Bangladesh”, bn:“বাংলাদেশ” },
{ flag:“🇨🇦”, en:“Canada”,     bn:“কানাডা” },
{ flag:“🇬🇧”, en:“UK”,         bn:“যুক্তরাজ্য” },
{ flag:“🇸🇦”, en:“Saudi Arabia”, bn:“সৌদি আরব” },
{ flag:“🇦🇪”, en:“UAE”,        bn:“আমিরাত” },
{ flag:“🇶🇦”, en:“Qatar”,      bn:“কাতার” },
{ flag:“🇰🇼”, en:“Kuwait”,     bn:“কুয়েত” },
{ flag:“🇦🇺”, en:“Australia”,  bn:“অস্ট্রেলিয়া” },
];

const css = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Hind+Siliguri:wght@300;400;500;600&display=swap'); :root { --bg:#0C0C0C;--card:#141414;--card2:#1A1A1A;--card3:#222222; --border:#2A2A2A;--border2:#333333; --cream:#F0EDE8;--cream2:#C8C4BE;--muted:#666666;--muted2:#444444; --gold:#B8962E;--gold2:#D4AF5A;--gold-dim:#1C1500;--gold-border:#6B5010; --radius:16px;--radius-sm:10px; --font-display:'Cormorant Garamond',Georgia,serif; --font-body:'DM Sans',system-ui,sans-serif; --font-bn:'Hind Siliguri','DM Sans',system-ui,sans-serif; } *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{background:#080808;display:flex;justify-content:center;min-height:100vh;font-family:var(--font-body);color:var(--cream);} .phone{width:390px;min-height:844px;background:var(--bg);border-radius:44px;overflow:hidden;position:relative;box-shadow:0 40px 120px rgba(0,0,0,0.9),0 0 0 1px #2A2A2A;margin:24px 0 80px;display:flex;flex-direction:column;} @media(max-width:430px){body{background:var(--bg);}.phone{width:100vw;border-radius:0;margin:0;min-height:100dvh;box-shadow:none;}} .status-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px 10px;background:#0A0A0A;font-size:11px;font-weight:600;color:var(--cream2);flex-shrink:0;} .top-bar{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#0F0F0F;border-bottom:1px solid var(--border);flex-shrink:0;} .top-bar .logo{font-family:var(--font-display);font-size:20px;color:var(--gold);font-weight:700;} .top-bar .logo span{font-family:var(--font-bn);font-size:13px;color:var(--cream2);margin-left:6px;font-weight:400;} .top-bar .actions{display:flex;gap:12px;align-items:center;} .icon-btn{background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;padding:4px;} .lang-btn{background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold2);font-size:11px;font-family:var(--font-bn);font-weight:600;padding:4px 10px;border-radius:20px;cursor:pointer;transition:all 0.2s;} .kotha-title{font-size:13px;font-weight:600;color:var(--gold);} .screen{flex:1;overflow-y:auto;overflow-x:hidden;padding-bottom:80px;} .screen::-webkit-scrollbar{display:none;} .bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:390px;height:72px;background:#0A0A0A;border-top:1px solid var(--border);display:flex;z-index:100;} @media(max-width:430px){.bottom-nav{width:100vw;left:0;transform:none;}} .nav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;transition:all 0.2s;background:none;border:none;padding:0;} .nav-item .nav-icon{font-size:18px;line-height:1;} .nav-item .nav-label{font-size:9px;font-family:var(--font-bn);color:var(--muted);} .nav-item.active .nav-label{color:var(--gold);} .nav-dot{width:4px;height:4px;border-radius:50%;background:var(--gold);margin-top:1px;} .hero{background:linear-gradient(180deg,#0F0E0A 0%,var(--bg) 100%);padding:28px 20px 24px;position:relative;overflow:hidden;} .hero::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(184,150,46,0.08) 0%,transparent 70%);pointer-events:none;} .hero-bangla{font-family:var(--font-bn);font-size:38px;font-weight:600;color:var(--gold);line-height:1.1;} .hero-title{font-family:var(--font-display);font-size:28px;color:var(--cream);margin-top:4px;font-weight:600;} .hero-sub{font-size:12px;color:var(--muted);margin-top:8px;line-height:1.6;} .hero-btn{margin-top:16px;display:inline-block;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold2);font-size:12px;font-weight:600;padding:9px 18px;border-radius:20px;cursor:pointer;transition:all 0.2s;font-family:var(--font-bn);} .section-hdr{display:flex;justify-content:space-between;align-items:center;padding:16px 16px 10px;} .section-title{font-size:13px;font-weight:600;color:var(--cream);font-family:var(--font-bn);} .section-link{font-size:11px;color:var(--gold);cursor:pointer;font-family:var(--font-bn);} .post-card{margin:0 10px 8px;padding:14px 14px 10px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:border-color 0.2s,background 0.2s;position:relative;overflow:hidden;} .post-card:hover{border-color:var(--border2);background:var(--card3);} .post-card-accent{position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:16px 0 0 16px;} .post-meta{display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;} .avatar{width:28px;height:28px;border-radius:50%;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--gold2);flex-shrink:0;} .post-author{font-size:11px;font-weight:600;color:var(--cream);font-family:var(--font-bn);} .verified{color:var(--gold);font-size:10px;} .post-kotha{font-size:10px;color:var(--muted);background:var(--card3);padding:2px 8px;border-radius:10px;font-family:var(--font-bn);} .post-time{font-size:10px;color:var(--muted2);margin-left:auto;} .type-badge{font-size:9px;font-weight:600;padding:2px 8px;border-radius:8px;font-family:var(--font-bn);} .type-Q{background:#0A1520;color:#5BA3D9;} .type-D{background:var(--gold-dim);color:var(--gold2);} .type-N{background:#0A2A0A;color:#4CAF50;} .type-W{background:#2A0A0A;color:#E57373;} .post-title{font-size:13px;color:var(--cream);line-height:1.5;margin-bottom:10px;font-family:var(--font-bn);font-weight:500;} .post-footer{display:flex;align-items:center;justify-content:space-between;} .reactions{font-size:11px;color:var(--muted);} .comment-count{font-size:10px;color:var(--gold2);} .divider{height:1px;background:var(--border);margin:4px 0;} .kotha-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 12px 8px;} .kotha-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:14px 10px 12px;cursor:pointer;position:relative;overflow:hidden;transition:border-color 0.2s;text-align:center;} .kotha-card-top{height:3px;position:absolute;top:0;left:0;right:0;border-radius:16px 16px 0 0;} .kotha-icon{font-size:26px;margin-bottom:6px;display:block;} .kotha-name{font-size:12px;font-weight:600;color:var(--cream);font-family:var(--font-bn);margin-bottom:3px;} .kotha-members{font-size:10px;color:var(--muted);font-family:var(--font-bn);} .kotha-joined{position:absolute;top:8px;right:8px;font-size:9px;background:var(--gold-dim);color:var(--gold2);padding:2px 6px;border-radius:8px;border:1px solid var(--gold-border);font-family:var(--font-bn);} .kotha-hdr{padding:14px 16px;background:#0F0F0F;border-bottom:1px solid var(--border);} .kotha-hdr-top{display:flex;justify-content:space-between;align-items:center;} .kotha-hdr-name{font-family:var(--font-display);font-size:20px;color:var(--cream);font-weight:700;} .kotha-hdr-meta{font-size:11px;color:var(--muted);margin-top:2px;font-family:var(--font-bn);} .join-btn{background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold2);font-size:11px;padding:6px 14px;border-radius:16px;cursor:pointer;font-weight:600;font-family:var(--font-bn);transition:all 0.2s;} .filters{display:flex;gap:6px;padding:10px 12px;overflow-x:auto;} .filters::-webkit-scrollbar{display:none;} .filter-pill{white-space:nowrap;font-size:11px;padding:5px 12px;border-radius:14px;cursor:pointer;border:1px solid var(--border);background:var(--card2);color:var(--muted);font-family:var(--font-bn);transition:all 0.2s;flex-shrink:0;} .filter-pill.active{background:var(--gold-dim);border-color:var(--gold-border);color:var(--gold2);} .ai-response{margin:0 10px 8px;padding:14px;background:#0D1A10;border:1px solid #1A3A20;border-left:3px solid var(--gold);border-radius:var(--radius);} .ai-badge{display:inline-flex;align-items:center;gap:6px;background:#1A2A1A;border:1px solid #2A4A2A;color:var(--gold2);font-size:10px;font-weight:600;padding:3px 10px;border-radius:10px;margin-bottom:10px;font-family:var(--font-bn);} .ai-text{font-size:12px;color:var(--cream);line-height:1.7;font-family:var(--font-bn);} .ai-source{font-size:10px;color:var(--muted);margin-top:10px;} .ai-disclaimer{font-size:10px;color:var(--muted);font-style:italic;margin-top:4px;} .ai-feedback{margin-top:12px;padding-top:10px;border-top:1px solid #1A3A20;display:flex;align-items:center;gap:10px;flex-wrap:wrap;} .ai-feedback-label{font-size:11px;color:var(--muted);font-family:var(--font-bn);} .feedback-btn{font-size:11px;padding:4px 12px;border-radius:10px;cursor:pointer;border:1px solid var(--border);background:var(--card3);color:var(--muted);font-family:var(--font-bn);transition:all 0.2s;} .feedback-btn.yes{background:#1A2A1A;border-color:#2A4A2A;color:var(--gold2);} .ai-thinking{margin:0 10px 8px;padding:14px;background:#0D1A10;border:1px solid #1A3A20;border-left:3px solid var(--gold);border-radius:var(--radius);} .thinking-dots{display:inline-flex;gap:4px;} .thinking-dots span{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:bounce 1.2s infinite;} .thinking-dots span:nth-child(2){animation-delay:0.2s;} .thinking-dots span:nth-child(3){animation-delay:0.4s;} @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}} .ask-box{margin:0 10px 8px;padding:12px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);} .ask-textarea{width:100%;background:var(--card3);border:1px solid var(--border2);color:var(--cream);font-size:12px;font-family:var(--font-bn);padding:10px 12px;border-radius:10px;resize:none;outline:none;line-height:1.6;transition:border-color 0.2s;} .ask-textarea:focus{border-color:var(--gold-border);} .ask-textarea::placeholder{color:var(--muted2);} .ask-submit{margin-top:8px;width:100%;padding:10px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold2);font-size:12px;font-weight:600;border-radius:10px;cursor:pointer;font-family:var(--font-bn);transition:all 0.2s;} .comment{margin:0 10px 6px;padding:12px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);} .comment-text{font-size:12px;color:var(--cream2);line-height:1.6;margin:6px 0;font-family:var(--font-bn);} .comment-react{font-size:10px;color:var(--muted);} .onboard{padding:24px 20px;} .progress-dots{display:flex;gap:8px;justify-content:center;margin-bottom:28px;} .progress-dot{height:6px;border-radius:3px;background:var(--border2);transition:all 0.3s;} .progress-dot.active{background:var(--gold);width:24px;} .progress-dot:not(.active){width:8px;} .onboard-title{font-family:var(--font-bn);font-size:22px;color:var(--cream);text-align:center;margin-bottom:6px;} .onboard-sub{font-size:12px;color:var(--muted);text-align:center;margin-bottom:24px;font-family:var(--font-bn);} .country-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:24px;} .country-card{padding:14px 10px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-sm);text-align:center;cursor:pointer;transition:all 0.2s;} .country-card.selected{background:var(--gold-dim);border-color:var(--gold);} .country-flag{font-size:26px;display:block;margin-bottom:4px;} .country-name{font-size:11px;font-family:var(--font-bn);color:var(--cream2);} .country-card.selected .country-name{color:var(--gold2);} .continue-btn{width:100%;padding:14px;background:var(--gold);color:#000;font-size:14px;font-weight:700;border:none;border-radius:14px;cursor:pointer;font-family:var(--font-bn);transition:all 0.2s;} .step-label{text-align:center;margin-top:12px;font-size:11px;color:var(--muted);font-family:var(--font-bn);} .profile-hero{background:linear-gradient(180deg,#0F0E0A,var(--bg));padding:28px 20px 20px;text-align:center;} .profile-avatar{width:72px;height:72px;border-radius:50%;background:var(--gold-dim);border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:var(--gold2);margin:0 auto;} .profile-name{font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--cream);margin-bottom:6px;margin-top:12px;} .badges-row{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:10px;} .badge-chip{background:var(--card2);border:1px solid var(--border2);padding:4px 10px;border-radius:10px;font-size:10px;color:var(--muted);font-family:var(--font-bn);} .profile-bio{font-size:12px;color:var(--muted);font-family:var(--font-bn);} .profile-since{font-size:10px;color:var(--muted2);margin-top:3px;font-family:var(--font-bn);} .stats-row{display:flex;border-top:1px solid var(--border);border-bottom:1px solid var(--border);} .stat-item{flex:1;padding:14px;text-align:center;border-right:1px solid var(--border);} .stat-item:last-child{border-right:none;} .stat-val{font-family:var(--font-display);font-size:22px;color:var(--gold);font-weight:700;} .stat-label{font-size:10px;color:var(--muted);font-family:var(--font-bn);} .section-label{font-size:12px;font-weight:600;color:var(--cream);padding:14px 16px 8px;font-family:var(--font-bn);} .kotha-row{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;} .kotha-row-icon{font-size:20px;} .kotha-row-info{flex:1;} .kotha-row-name{font-size:13px;font-weight:600;color:var(--cream);font-family:var(--font-bn);} .kotha-row-meta{font-size:10px;color:var(--muted);font-family:var(--font-bn);} .premium-banner{margin:12px;padding:14px;background:var(--gold-dim);border:1px solid var(--gold-border);border-radius:var(--radius);display:flex;align-items:center;gap:10px;} .premium-info{flex:1;} .premium-title{font-size:13px;font-weight:600;color:var(--gold2);font-family:var(--font-bn);} .premium-sub{font-size:10px;color:var(--muted);font-family:var(--font-bn);} .premium-manage{font-size:11px;color:var(--gold);cursor:pointer;font-family:var(--font-bn);flex-shrink:0;} .post-detail-body{padding:14px 16px;background:#0F0F0F;border-bottom:1px solid var(--border);} .post-full-title{font-size:15px;font-weight:600;color:var(--cream);line-height:1.55;margin:10px 0;font-family:var(--font-bn);} .post-actions{display:flex;align-items:center;gap:16px;} .action-btn{font-size:11px;color:var(--muted);cursor:pointer;font-family:var(--font-bn);background:none;border:none;} .reactions-full{font-size:13px;color:var(--muted);} .fade-in{animation:fadeIn 0.25s ease;} @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} .empty-state{padding:60px 20px;text-align:center;} .empty-icon{font-size:48px;margin-bottom:12px;} .empty-text{font-size:14px;color:var(--muted);font-family:var(--font-bn);}`;

const typeClass = t => ({ Discussion:“D”, Question:“Q”, News:“N”, Warning:“W”, “আলোচনা”:“D”, “প্রশ্ন”:“Q”, “খবর”:“N”, “সতর্কতা”:“W” }[t] || “D”);
const typeAccent = t => ({ Q:”#1A3A5C”, N:”#1A3A1A”, W:”#3A1A1A”, D:”#2A2000” }[typeClass(t)] || “#2A2000”);

async function askAI(question, lang) {
const systemPrompt = lang === “bn”
? “আপনি কি কথা প্ল্যাটফর্মের AI সহকারী। বাংলাদেশি প্রবাসীদের ইমিগ্রেশন, ভিসা এবং জিসিসি কর্মসংস্থান বিষয়ে সঠিক, সহায়ক তথ্য প্রদান করুন। সংক্ষিপ্ত উত্তর দিন। বলুন এটি শুধু তথ্যমূলক। বাংলায় উত্তর দিন।”
: “You are the Ki Kotha AI assistant. Provide accurate helpful information to Bangladeshi diaspora about immigration, visas, GCC employment. Keep answers concise. Always note this is informational only, not legal advice.”;
try {
const res = await fetch(“https://api.anthropic.com/v1/messages”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“x-api-key”: import.meta.env.VITE_ANTHROPIC_KEY,
“anthropic-version”: “2023-06-01”,
},
body: JSON.stringify({
model: “claude-sonnet-4-20250514”,
max_tokens: 800,
system: systemPrompt,
messages: [{ role: “user”, content: question }],
}),
});
const data = await res.json();
return data.content?.[0]?.text || “Sorry, could not generate a response right now.”;
} catch {
return lang === “bn”
? “দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না। একটু পরে আবার চেষ্টা করুন।”
: “Sorry, could not connect right now. Please try again in a moment.”;
}
}

export default function App() {
const [lang, setLang] = useState(“en”);
const [screen, setScreen] = useState(“home”);
const [activeFilter, setActiveFilter] = useState(0);
const [selectedPost, setSelectedPost] = useState(null);
const [selectedKotha, setSelectedKotha] = useState(null);
const [onboardStep, setOnboardStep] = useState(0);
const [selectedCountry, setSelectedCountry] = useState(1);
const [question, setQuestion] = useState(””);
const [aiResponse, setAiResponse] = useState(null);
const [aiThinking, setAiThinking] = useState(false);
const [feedbackGiven, setFeedbackGiven] = useState(false);
const [savedPosts, setSavedPosts] = useState([]);
const [joinedKothas, setJoinedKothas] = useState([“immigration”,“lifeabroad”,“canada”]);
const topRef = useRef(null);
const tx = T[lang];

const scrollTop = () => topRef.current?.scrollTo({ top: 0, behavior: “smooth” });

const handleAsk = async () => {
if (!question.trim()) return;
setAiThinking(true);
setAiResponse(null);
const resp = await askAI(question, lang);
setAiThinking(false);
setAiResponse(resp);
setQuestion(””);
};

const toggleSave = (id) => setSavedPosts(p => p.includes(id) ? p.filter(x=>x!==id) : […p,id]);
const toggleJoin = (kid) => setJoinedKothas(p => p.includes(kid) ? p.filter(x=>x!==kid) : […p,kid]);

const navItems = [
{ id:“home”, icon:“⌂”, label:tx.home },
{ id:“feed”, icon:“◎”, label:tx.feed },
{ id:“communities”, icon:“⊞”, label:tx.communities },
{ id:“saved”, icon:“♡”, label:tx.saved },
{ id:“profile”, icon:“◉”, label:tx.profile },
];

const PostCard = ({ post }) => {
const title = lang===“bn” ? post.titleBn : post.titleEn;
const name  = lang===“bn” ? post.nameBn  : post.name;
const type  = lang===“bn” ? tx[`type${typeClass(post.type)}`] || post.type : post.type;
const tc    = typeClass(post.type);
return (
<div className=“post-card fade-in” onClick={() => { setSelectedPost(post); setScreen(“post”); scrollTop(); }}>
<div className=“post-card-accent” style={{ background: typeAccent(post.type) }} />
<div className="post-meta">
<div className="avatar">{post.av}</div>
<span className="post-author">{post.flag} {name}{post.badge && <span className="verified"> ✓</span>}</span>
<span className="post-kotha">k/{tx.k[post.kotha]}</span>
<span className="post-time">{post.time}</span>
</div>
<div style={{ marginBottom:6 }}>
<span className={`type-badge type-${tc}`}>{type}</span>
</div>
<div className="post-title">{title}</div>
<div className="post-footer">
<span className="reactions">{post.reactions}</span>
<span className="comment-count">💬 {post.comments}</span>
</div>
</div>
);
};

const HomeScreen = () => (
<div className="fade-in">
<div className="hero">
<div className="hero-bangla">{tx.brand}</div>
<div className="hero-title">{tx.tagline}</div>
<div className="hero-sub">{tx.taglineSub}</div>
<button className=“hero-btn” onClick={() => setScreen(“communities”)}>{tx.explore}</button>
</div>
<div className="divider" />
<div className="section-hdr">
<span className="section-title">{tx.trending}</span>
<span className=“section-link” onClick={() => setScreen(“feed”)}>{tx.seeAll}</span>
</div>
{POSTS.map(p => <PostCard key={p.id} post={p} />)}
</div>
);

const FeedScreen = () => {
const filters = [tx.filterHot, tx.filterNew, tx.filterQ, tx.filterNews, tx.filterWarn];
const kotha = selectedKotha ? KOTHAS.find(k => k.id===selectedKotha) : null;
const filteredPosts = selectedKotha ? POSTS.filter(p => p.kotha===selectedKotha) : POSTS;
const isJoined = selectedKotha ? joinedKothas.includes(selectedKotha) : false;
return (
<div className="fade-in">
{kotha && (
<div className="kotha-hdr">
<div className="kotha-hdr-top">
<div>
<div className="kotha-hdr-name">{kotha.icon} {tx.k[kotha.id]}</div>
<div className="kotha-hdr-meta">{kotha.members} {tx.members} · {tx.active}</div>
</div>
<button className=“join-btn” onClick={() => toggleJoin(kotha.id)} style={isJoined?{background:“var(–card3)”,color:“var(–muted)”}:{}}>
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
<textarea className=“ask-textarea” rows={3} placeholder={tx.askPlaceholder} value={question} onChange={e => setQuestion(e.target.value)} />
<button className="ask-submit" onClick={handleAsk}>{tx.postBtn}</button>
</div>
{aiThinking && (
<div className="ai-thinking">
<div className="ai-badge">{tx.aiBadge}</div>
<div style={{display:“flex”,alignItems:“center”,gap:8,marginTop:4}}>
<div className="thinking-dots"><span/><span/><span/></div>
<span style={{fontSize:11,color:“var(–muted)”,fontFamily:“var(–font-bn)”}}>{tx.thinking}</span>
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
<button className=“feedback-btn” onClick={() => setFeedbackGiven(true)}>{tx.no}</button>
</div>
</div>
)}
{filteredPosts.map(p => <PostCard key={p.id} post={p} />)}
</div>
);
};

const CommunitiesScreen = () => (
<div className="fade-in">
<div className="section-hdr">
<span className="section-title">{tx.kothas}</span>
<span style={{fontSize:11,color:“var(–muted)”,fontFamily:“var(–font-bn)”}}>{tx.commCount}</span>
</div>
<div className="kotha-grid">
{KOTHAS.map(k => {
const isJ = joinedKothas.includes(k.id);
return (
<div key={k.id} className=“kotha-card” onClick={() => { setSelectedKotha(k.id); setScreen(“feed”); }}>
<div className=“kotha-card-top” style={{ background: k.accent }} />
{isJ && <div className="kotha-joined">{tx.joined}</div>}
<span className="kotha-icon">{k.icon}</span>
<div className="kotha-name">{tx.k[k.id]}</div>
<div className="kotha-members">{k.members} {tx.members}</div>
</div>
);
})}
</div>
</div>
);

const PostDetailScreen = () => {
if (!selectedPost) return null;
const p = selectedPost;
const title = lang===“bn” ? p.titleBn : p.titleEn;
const name  = lang===“bn” ? p.nameBn  : p.name;
const type  = lang===“bn” ? tx[`type${typeClass(p.type)}`] || p.type : p.type;
const tc    = typeClass(p.type);
const isQ   = p.type === “Question”;
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
<button className=“action-btn” onClick={() => toggleSave(p.id)}>{savedPosts.includes(p.id)?“🔖 Saved”:“🔖 Save”}</button>
<button className="action-btn">{tx.share}</button>
</div>
</div>
<div className="divider" />
{isQ && (
<>
<div className="ai-response fade-in">
<div className="ai-badge">{tx.aiBadge}</div>
<div className="ai-text">
{lang===“bn”
? “হ্যাঁ — আপনি সৌদি ওয়ার্ক ভিসায় থাকা অবস্থায় কানাডা PR এর জন্য আবেদন করতে পারবেন। এক্সপ্রেস এন্ট্রিতে কানাডায় থাকা বা বেকার থাকা প্রয়োজন নেই।”
: “Yes — you can apply for Canadian PR while on a Saudi work visa. Express Entry does not require you to be in Canada or unemployed.”}
</div>
<div className=“ai-text” style={{marginTop:8,color:“var(–cream2)”}}>
{lang===“bn”
? “আপনার নিয়োগকর্তার মতামত IRCC-এর কাছে প্রাসঙ্গিক নয়। CRS স্কোর, IELTS এবং কাজের অভিজ্ঞতার ডকুমেন্টেশন প্রস্তুত রাখুন।”
: “Your employer’s knowledge of your plans is not relevant to IRCC. Ensure your CRS score, IELTS, and work experience documentation are current.”}
</div>
<div className="ai-source">{tx.sources}</div>
<div className="ai-disclaimer">{tx.aiDisclaimer}</div>
<div className="ai-feedback">
<span className="ai-feedback-label">{tx.helpful}</span>
<button className="feedback-btn yes">{tx.yes}</button>
<button className="feedback-btn">{tx.no}</button>
</div>
</div>
<div style={{padding:“8px 16px”,fontSize:11,color:“var(–muted)”,fontFamily:“var(–font-bn)”}}>{tx.communityAdd}</div>
</>
)}
<div className="divider" />
<div style={{padding:“10px 16px 6px”}}>
<span style={{fontSize:13,fontWeight:600,color:“var(–cream)”,fontFamily:“var(–font-bn)”}}>{tx.commentsHdr(p.comments)}</span>
</div>
{COMMENTS.map((c,i) => (
<div key={i} className="comment">
<div className="post-meta">
<div className="avatar" style={{width:24,height:24,fontSize:9}}>{c.av}</div>
<span className="post-author" style={{fontSize:11}}>{c.flag} {lang===“bn”?c.nameBn:c.name}{c.badge&&<span className="verified"> ✓</span>}</span>
</div>
<div className="comment-text">{lang===“bn”?c.textBn:c.textEn}</div>
<div className="comment-react">{c.reactions}</div>
</div>
))}
<div className="ask-box" style={{marginTop:8}}>
<textarea className=“ask-textarea” rows={2} placeholder={lang===“bn”?“মন্তব্য লিখুন…”:“Add a comment…”} value={question} onChange={e => setQuestion(e.target.value)} />
<button className="ask-submit" onClick={handleAsk}>{lang===“bn”?“মন্তব্য করুন”:“Comment”}</button>
</div>
{aiThinking && (
<div className="ai-thinking">
<div className="ai-badge">{tx.aiBadge}</div>
<div style={{display:“flex”,alignItems:“center”,gap:8,marginTop:4}}>
<div className="thinking-dots"><span/><span/><span/></div>
<span style={{fontSize:11,color:“var(–muted)”}}>{tx.thinking}</span>
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
};

const SavedScreen = () => {
const saved = POSTS.filter(p => savedPosts.includes(p.id));
if (!saved.length) return (
<div className="empty-state fade-in">
<div className="empty-icon">🔖</div>
<div className="empty-text">{lang===“bn”?“কোনো সংরক্ষিত পোস্ট নেই”:“No saved posts yet”}</div>
</div>
);
return <div className="fade-in">{saved.map(p => <PostCard key={p.id} post={p} />)}</div>;
};

const ProfileScreen = () => (
<div className="fade-in">
<div className="profile-hero">
<div className="profile-avatar">AW</div>
<div className="profile-name">{tx.profileName}</div>
<div className="badges-row">
<span className="badge-chip">🇨🇦 {lang===“bn”?“কানাডা”:“Canada”}</span>
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
{[“canada”,“immigration”,“jobscareer”].map(kid => {
const k = KOTHAS.find(x => x.id===kid);
return (
<div key={kid} className=“kotha-row” onClick={() => { setSelectedKotha(kid); setScreen(“feed”); }}>
<div className="kotha-row-icon">{k.icon}</div>
<div className="kotha-row-info">
<div className="kotha-row-name">{tx.k[kid]}</div>
<div className="kotha-row-meta">k/{tx.k[kid]} · {k.members} {tx.members}</div>
</div>
<span style={{color:“var(–muted)”,fontSize:18}}>›</span>
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
</div>
);

const OnboardingScreen = () => (
<div className="onboard fade-in">
<div className="progress-dots">
{[0,1,2,3].map(i => <div key={i} className={`progress-dot${i===onboardStep?" active":""}`} />)}
</div>
{onboardStep===0 && (
<>
<div className="onboard-title">{lang===“bn”?“স্বাগতম 🙏”:“Welcome 🙏”}</div>
<div className="onboard-sub">{lang===“bn”?“কি কথায় আপনাকে স্বাগত জানাই”:“Welcome to Ki Kotha”}</div>
<div style={{textAlign:“center”,marginBottom:28}}>
<div style={{fontSize:56,marginBottom:12,fontFamily:“var(–font-bn)”,color:“var(–gold)”}}>কি কথা</div>
<div style={{fontSize:14,color:“var(–muted)”,fontFamily:“var(–font-bn)”}}>{tx.taglineSub}</div>
</div>
<button className=“continue-btn” onClick={() => setOnboardStep(1)}>{tx.continueBtn}</button>
</>
)}
{onboardStep===1 && (
<>
<div className="onboard-title">{tx.where}</div>
<div className="onboard-sub">{tx.personalizeSub}</div>
<div className="country-grid">
{COUNTRIES.map((c,i) => (
<div key={i} className={`country-card${selectedCountry===i?" selected":""}`} onClick={() => setSelectedCountry(i)}>
<span className="country-flag">{c.flag}</span>
<div className="country-name">{lang===“bn”?c.bn:c.en}</div>
</div>
))}
</div>
<button className=“continue-btn” onClick={() => setOnboardStep(2)}>{tx.continueBtn}</button>
<div className="step-label">{tx.step(2,4)}</div>
</>
)}
{onboardStep===2 && (
<>
<div className="onboard-title">{lang===“bn”?“আপনি কেন এখানে?”:“What brings you here?”}</div>
<div className="onboard-sub">{lang===“bn”?“একাধিক বেছে নিতে পারেন”:“Select all that apply”}</div>
<div style={{display:“flex”,flexDirection:“column”,gap:10,marginBottom:24}}>
{[[“✈️”,lang===“bn”?“অভিবাসন”:“Immigration”],[“💼”,lang===“bn”?“চাকরি”:“Jobs”],[“🌍”,lang===“bn”?“সম্প্রদায়”:“Community”],[“📰”,lang===“bn”?“খবর”:“News”],[“👨‍👩‍👧”,lang===“bn”?“পরিবার”:“Family & Visa”]].map(([icon,label],i) => (
<div key={i} style={{display:“flex”,alignItems:“center”,gap:12,padding:“12px 16px”,background:“var(–card2)”,border:“1px solid var(–border)”,borderRadius:“var(–radius-sm)”,cursor:“pointer”}}>
<span style={{fontSize:22}}>{icon}</span>
<span style={{fontSize:13,fontFamily:“var(–font-bn)”,color:“var(–cream)”}}>{label}</span>
</div>
))}
</div>
<button className=“continue-btn” onClick={() => setOnboardStep(3)}>{tx.continueBtn}</button>
<div className="step-label">{tx.step(3,4)}</div>
</>
)}
{onboardStep===3 && (
<>
<div className="onboard-title">{lang===“bn”?“ভাষা বেছে নিন”:“Choose your language”}</div>
<div className="onboard-sub">{lang===“bn”?“যেকোনো সময় পরিবর্তন করা যাবে”:“You can change this anytime”}</div>
<div style={{display:“flex”,flexDirection:“column”,gap:12,marginBottom:28}}>
{[[“English”,“en”],[“বাংলা”,“bn”]].map(([label,code]) => (
<button key={code} style={{padding:“18px”,background:lang===code?“var(–gold-dim)”:“var(–card2)”,border:`1px solid ${lang===code?"var(--gold)":"var(--border)"}`,borderRadius:“var(–radius)”,color:lang===code?“var(–gold2)”:“var(–cream)”,fontSize:16,fontFamily:“var(–font-bn)”,fontWeight:600,cursor:“pointer”,transition:“all 0.2s”}} onClick={() => setLang(code)}>{label}</button>
))}
</div>
<button className=“continue-btn” onClick={() => setScreen(“home”)}>{lang===“bn”?“শুরু করুন →”:“Get Started →”}</button>
<div className="step-label">{tx.step(4,4)}</div>
</>
)}
</div>
);

const getTopBarContent = () => {
if (screen===“post” && selectedPost) return { kotha:`k/${tx.k[selectedPost.kotha]}`, back:true };
if (screen===“feed” && selectedKotha)  return { kotha:`k/${tx.k[selectedKotha]}`, back:true };
if (screen===“onboarding”) return { hide:true };
return { back:false };
};
const topBar = getTopBarContent();

return (
<>
<style>{css}</style>
<div className="phone">
<div className="status-bar">
<span>9:41</span>
<span>●●●  WiFi  🔋</span>
</div>
{!topBar.hide && (
<div className="top-bar">
{topBar.back
? <button className=“icon-btn” style={{fontSize:16,color:“var(–cream)”}} onClick={() => { setScreen(selectedPost?“feed”:“communities”); setSelectedPost(null); }}>{tx.back}</button>
: <div className="logo">{tx.brand}<span>{tx.brandBn}</span></div>
}
{topBar.kotha && <span className="kotha-title">{topBar.kotha}</span>}
<div className="actions">
<button className="icon-btn">🔍</button>
<button className=“lang-btn” onClick={() => setLang(l => l===“en”?“bn”:“en”)}>{tx.langToggle}</button>
</div>
</div>
)}
<div className="screen" ref={topRef}>
{screen===“onboarding”  && <OnboardingScreen />}
{screen===“home”        && <HomeScreen />}
{screen===“feed”        && <FeedScreen />}
{screen===“communities” && <CommunitiesScreen />}
{screen===“post”        && <PostDetailScreen />}
{screen===“saved”       && <SavedScreen />}
{screen===“profile”     && <ProfileScreen />}
</div>
{screen!==“onboarding” && (
<div className="bottom-nav">
{navItems.map(item => (
<button key={item.id} className={`nav-item${screen===item.id||((screen==="feed"||screen==="post")&&item.id==="feed")?" active":""}`}
onClick={() => { setScreen(item.id); if(item.id!==“feed”) setSelectedKotha(null); setSelectedPost(null); }}>
<span className="nav-icon">{item.icon}</span>
<span className="nav-label">{item.label}</span>
{(screen===item.id||((screen===“feed”||screen===“post”)&&item.id===“feed”)) && <div className="nav-dot" />}
</button>
))}
</div>
)}
</div>
</>
);
}
