import { useEffect, useRef } from "react";
import { info } from "../data/info";
import { skills } from "../data/skills";

export default function Hero({ lang }) {
  const isEn = lang === "en";
  const typingRef = useRef(null);

  useEffect(() => {
    const roles = info.typingRoles;
    let roleIndex = 0, charIndex = 0, deleting = false;
    let timer;

    function typeEffect() {
      const role = roles[roleIndex];
      if (!deleting) {
        if (typingRef.current) typingRef.current.textContent = role.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === role.length) {
          deleting = true;
          timer = setTimeout(typeEffect, 1800);
          return;
        }
      } else {
        if (typingRef.current) typingRef.current.textContent = role.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      timer = setTimeout(typeEffect, deleting ? 45 : 85);
    }
    typeEffect();
    return () => clearTimeout(timer);
  }, []);

  const topSkills = skills.flatMap(g => g.items).slice(0, 4);

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid"></div>
      <div className="hero-orb orb-one"></div>
      <div className="hero-orb orb-two"></div>
      <div className="hero-orb orb-three"></div>

      <div className="hero-content container">
        <div className="hero-badge">
          <span className="status-dot"></span>
          {isEn ? "Available for New Technical Opportunities" : "متاحة للفرص التقنية الجديدة"}
        </div>

        <p className="hero-small-title">
          {(isEn ? info.titleEn : info.title).toUpperCase()}
        </p>

        <h1 className="hero-title">
          {isEn ? "Hi, I'm" : "أهلاً، أنا"}{" "}
          <span>{isEn ? info.nameEn : info.name}</span>
        </h1>

        <div className="typing-container">
          <span ref={typingRef}></span>
          <span className="typing-cursor">|</span>
        </div>

        <p className="hero-description">
          {isEn ? info.subtitleEn : info.subtitle}
        </p>

        <div className="hero-buttons">
          <a href="#experience" className="main-btn">
            {isEn ? "Explore My Experience" : "استكشف خبرتي"} <span>↓</span>
          </a>
          <a href="#projects" className="projects-btn">
            {isEn ? "From Idea to Code" : "من الفكرة إلى الكود"} <span>◈</span>
          </a>
          <a href="#contact" className="outline-btn">
            {isEn ? "Let's Connect" : "لنتواصل"} <span>↗</span>
          </a>
        </div>

        <div className="floating-tech">
          {topSkills.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      <div className="hero-bottom">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
