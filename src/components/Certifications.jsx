import { useEffect, useRef } from "react";
import { certifications } from "../data/certifications";

const SYMBOLS = ["✦", "◫", "◎", "◇", "∞", "◉"];

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

function CertCard({ cert, num, lang }) {
  const ref = useRef(null);
  useReveal(ref);
  const isEn = lang === "en";

  const title = isEn ? (cert.titleEn || cert.title) : cert.title;
  const issuer = isEn ? (cert.issuerEn || cert.issuer) : cert.issuer;

  return (
    <div className="cert-card" ref={ref}>
      <div className="cert-top">
        <span>{issuer}</span>
        <b>{String(num).padStart(2, "0")}</b>
      </div>
      <div className="cert-symbol">{SYMBOLS[(num - 1) % SYMBOLS.length]}</div>
      <small>{issuer?.toUpperCase()} CERTIFIED</small>
      <h3>{title}</h3>
      <p>{issuer} Certified Professional</p>
      {cert.date && <strong>{isEn ? (cert.dateEn || cert.date) : cert.date}</strong>}
      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noreferrer"
          style={{ display: "block", marginTop: 8, fontSize: ".8rem", color: "var(--primary)" }}
        >
          {isEn ? "View Certificate ↗" : "عرض الشهادة ↗"}
        </a>
      )}
    </div>
  );
}

export default function Certifications({ lang }) {
  const isEn = lang === "en";
  const sorted = [...certifications].sort((a, b) => a.order - b.order);

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <div className="section-heading">
          <span>04 — CERTIFICATIONS</span>
          <h2>{isEn ? "Certifications" : "الشهادات المعتمدة"}</h2>
          <p>
            {isEn
              ? "Professional certifications reflecting my focus on modern tech and enterprise solutions."
              : "شهادات مهنية تعكس اهتمامي بالتقنيات الحديثة وحلول المؤسسات."}
          </p>
        </div>
        <div className="cert-grid">
          {sorted.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} num={i + 1} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
