import { useEffect, useRef } from "react";
import { skills } from "../data/skills";

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

function SkillBox({ group, num, lang }) {
  const ref = useRef(null);
  useReveal(ref);
  const isEn = lang === "en";
  const catLabel = isEn ? group.category : (group.categoryAr || group.category);

  return (
    <div className={`skill-box${num === 1 ? " featured" : ""}`} ref={ref}>
      <div className="skill-number">{String(num).padStart(2, "0")}</div>
      <h3>{catLabel}</h3>
      <div className="skill-list">
        {group.items.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  );
}

export default function Skills({ lang }) {
  const isEn = lang === "en";
  const sorted = [...skills].sort((a, b) => a.order - b.order);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-heading">
          <span>03 — TECHNOLOGIES</span>
          <h2>{isEn ? "Technical Skills" : "المهارات التقنية"}</h2>
          <p>
            {isEn
              ? "Tools and technologies I use to build practical, scalable solutions."
              : "الأدوات والتقنيات التي أستخدمها لبناء حلول تقنية عملية وقابلة للتوسع."}
          </p>
        </div>
        <div className="skills-grid">
          {sorted.map((group, i) => (
            <SkillBox key={group.id} group={group} num={i + 1} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
