import p11 from "../assets/project11.png";
import p12 from "../assets/project12.png";
import p13 from "../assets/project13.png";
import p14 from "../assets/project14.png";
import p15 from "../assets/project15.png";
import p16 from "../assets/project16.png";
import p17 from "../assets/project17.png";
import p18 from "../assets/project18.png";
import p19 from "../assets/project19.png";
import p20 from "../assets/project20.png";

import p211 from "../assets/project211.png";
import p22 from "../assets/project22.png";
import p23 from "../assets/project23.png";
import p24 from "../assets/project24.png";
import p25 from "../assets/project25.png";
import p26 from "../assets/project26.png";
import p27 from "../assets/project27.png";
import p28 from "../assets/project28.png";
import p29 from "../assets/project29.png";

import h319 from "../assets/p319.png";
import h31 from "../assets/P31.png";
import h32 from "../assets/P32.png";
import h33 from "../assets/P33.png";
import h34 from "../assets/P34.png";
import h36 from "../assets/P36.png";
import h38 from "../assets/P38.png";
import h39 from "../assets/P39.png";
import h310 from "../assets/P310.png";
import h312 from "../assets/P312.png";
import h313 from "../assets/P313.png";
import h314 from "../assets/P314.png";
import h315 from "../assets/P315.png";
import h316 from "../assets/P316.png";
import h317 from "../assets/P317.png";
import h318 from "../assets/P318.png";
import pn1 from "../assets/PN1.png";
import pn2 from "../assets/PN2.png";

export const projects = [
  {
    id: 1,
    title: "مقترح تطوير موقع الاتحاد السعودي لكرة اليد",
    titleEn: "Saudi Handball Federation Website Redesign Proposal",
    description: "مشروع مقترح أعددته بمبادرة شخصية لإظهار رؤيتي في تطوير الموقع، يشمل إعادة تصميم الواجهات بشكل مميز ومبتكر.",
    descriptionEn: "A personal initiative proposal showcasing my vision for redesigning the federation's website with innovative and distinctive interfaces.",
    tags: "HTML / CSS / JS, Live Streaming, UI/UX Design, Performance",
    tagsEn: "HTML / CSS / JS, Live Streaming, UI/UX Design, Performance",
    badgeText: "Concept Project",
    badgeType: "concept",
    year: "2026",
    isFeatured: true,
    images: [p11, p12, p13, p14, p15, p16, p17, p18, p19, p20],
    order: 1,
  },
  {
    id: 2,
    title: "موقع مؤسسة — تحت الإنشاء",
    titleEn: "Institution Website — Under Construction",
    description: "تطوير موقع مؤسسة متكامل مع تفعيل ميزة الاشتراك للزوار، يشمل واجهات احترافية وإدارة محتوى ديناميكي.",
    descriptionEn: "Developing a full institution website with visitor subscription functionality, featuring professional interfaces and dynamic content management.",
    tags: "ASP.NET Core, SQL Server, Subscription System, Entity Framework, C#",
    tagsEn: "ASP.NET Core, SQL Server, Subscription System, Entity Framework, C#",
    badgeText: "Full-Stack",
    badgeType: "featured",
    year: "2026",
    isFeatured: true,
    images: [p211, p22, p23, p24, p25, p26, p27, p28, p29],
    order: 2,
  },
  {
    id: 3,
    title: "حُجّة — منصة مكاتب المحاماة مع نورة AI",
    titleEn: "Hujjah — Law Firm Platform with Noura AI",
    description: "منصة ويب لمكاتب المحاماة ترتّب العمل اليومي بمزايا واضحة: إدارة العملاء، الأتمتة، والمكتبة القانونية. وتضم <strong>نورة</strong> — مساعد قانوني ذكي يرد على الاستفسارات ويوصلك بأفضل المحامين حسب نوع القضية والمدينة.",
    descriptionEn: "A web platform for law firms that organizes daily work with clear features: client management, automation, and a legal library. It includes <strong>Noura</strong> — a legal AI assistant that answers inquiries and matches you with the best lawyers by case type and city.",
    tags: "Legal Tech, AI Assistant, CRM, WhatsApp, React",
    tagsEn: "Legal Tech, AI Assistant, CRM, WhatsApp, React",
    badgeText: "Live Product",
    badgeType: "featured",
    year: "2026",
    isFeatured: true,
    images: [h319, h31, h32, h33, h34, h36, h38, h39, h310, h312, h313, h314, h315, h316, h317, h318, pn1, pn2],
    featuredIndexes: [0, 16, 17],
    links: [
      { label: "زيارة حُجّة", labelEn: "Visit Hujjah", url: "https://hujjah.axdsolutions.io/" },
      { label: "تجربة نورة", labelEn: "Try Noura", url: "https://noura-ai.axdsolutions.io/consumer/chat" },
    ],
    order: 3,
  },
];
