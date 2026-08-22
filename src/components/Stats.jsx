import { useEffect, useRef } from "react";
import { certifications } from "../data/certifications";
import { skills } from "../data/skills";

function useCounter(targetRef, value) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const duration = 1200;
          const startTime = performance.now();
          function animate(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            el.textContent = Math.floor(progress * value);
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = value;
          }
          requestAnimationFrame(animate);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
}

function StatCard({ icon, value, suffix, label }) {
  const ref = useRef(null);
  useCounter(ref, value);
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <strong ref={ref}>0</strong>
        <span>{suffix}</span>
      </div>
      <p>{label}</p>
    </div>
  );
}

export default function Stats() {
  const techDomains = skills.length;

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <StatCard icon="✦" value={certifications.length} suffix="+" label="Certifications" />
          <StatCard icon="◉" value={50} suffix="+" label="Users Supported" />
          <StatCard icon="◇" value={techDomains} suffix="+" label="Technology Domains" />
          <StatCard icon="∞" value={100} suffix="%" label="Passion for Technology" />
        </div>
      </div>
    </section>
  );
}
