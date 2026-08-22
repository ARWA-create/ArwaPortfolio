import { useState, useEffect } from "react";
import { info } from "../data/info";
import arwaLogo from "../assets/ArwaLogo.png";

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isEn = lang === "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setRevealed(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#home",           ar: "الرئيسية",   en: "Home" },
    { href: "#experience",     ar: "الخبرة",      en: "Experience" },
    { href: "#projects",       ar: "المشاريع",   en: "Projects" },
    { href: "#skills",         ar: "المهارات",   en: "Skills" },
    { href: "#certifications", ar: "الشهادات",   en: "Certifications" },
    { href: "#contact",        ar: "تواصل",       en: "Contact" },
  ];

  return (
    <nav className={`portfolio-nav${scrolled ? " nav-scrolled" : ""}`} id="portfolioNav">
      <div className="nav-container">
        <a href="#home" className="portfolio-logo">
          <img src={arwaLogo} alt="Arwa Logo" className="nav-logo-img" />
          <span className="logo-text">
            {isEn ? info.nameEn : info.name}
            <small>Software Engineer</small>
          </span>
        </a>

        <div className={`nav-links${revealed ? " revealed" : ""}${menuOpen ? " mobile-open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {isEn ? link.en : link.ar}
            </a>
          ))}
        </div>

        <div className="lang-switcher">
          <button
            onClick={() => setLang("ar")}
            className={lang === "ar" ? "lang-active" : "lang-muted"}
          >
            عربي
          </button>
          <span className="lang-sep">/</span>
          <button
            onClick={() => setLang("en")}
            className={lang === "en" ? "lang-active" : "lang-muted"}
          >
            EN
          </button>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
