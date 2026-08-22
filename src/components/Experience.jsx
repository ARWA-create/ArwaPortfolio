import { useEffect, useRef } from "react";
import { experiences } from "../data/experiences";

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

function ExperienceItem({ exp, lang, isCurrent }) {
  const ref = useRef(null);
  useReveal(ref);
  const isEn = lang === "en";

  const title = isEn ? exp.jobTitleEn : exp.jobTitle;
  const company = isEn ? exp.companyEn : exp.company;
  const period = isEn ? exp.periodEn : exp.period;
  const description = isEn ? exp.descriptionEn : exp.description;
  const tags = isEn ? exp.tagsEn : exp.tags;

  return (
    <div className="experience-item" ref={ref}>
      <div className="timeline-dot"><span></span></div>
      <div className="experience-card">
        <div className="experience-header">
          <span className="experience-date">{period}</span>
          {isCurrent && <span className="current-badge">CURRENT</span>}
        </div>
        <h3>{title}</h3>
        <h4>{company}</h4>
        {description && <p>{description}</p>}
        {tags && (
          <div className="tags">
            {tags.split(",").map((t, i) => <span key={i}>{t.trim()}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Experience({ lang }) {
  const isEn = lang === "en";
  const sorted = [...experiences].sort((a, b) => a.order - b.order);
  const minOrder = Math.min(...sorted.map(e => e.order));

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-heading">
          <span>01 — EXPERIENCE</span>
          <h2>{isEn ? "Professional Experience" : "الخبرة المهنية"}</h2>
          <p>
            {isEn
              ? "A journey combining software engineering, technical support, and enterprise systems."
              : "مسيرة تجمع بين هندسة البرمجيات، الدعم التقني والأنظمة المؤسسية."}
          </p>
        </div>
        <div className="experience-timeline">
          {sorted.map((exp) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              lang={lang}
              isCurrent={exp.order === minOrder}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
