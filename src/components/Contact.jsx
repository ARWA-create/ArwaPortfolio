import { info } from "../data/info";

export default function Contact({ lang }) {
  const isEn = lang === "en";

  function fixUrl(url) {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:"))
      return url;
    return "https://" + url;
  }

  function waLink(phone) {
    if (!phone) return null;
    const digits = phone.replace(/\D/g, "");
    const normalized = digits.startsWith("0") ? "966" + digits.slice(1) : digits;
    return "https://wa.me/" + normalized;
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-box">
          <div className="contact-orb"></div>
          <div className="contact-content">
            <span>05 — LET&#39;S CONNECT</span>
            <h2
              dangerouslySetInnerHTML={{
                __html: isEn
                  ? "Let&rsquo;s Build Something That Makes a <em>Difference</em>."
                  : "لنبني شيئاً يُحدث <em>فرقاً</em>.",
              }}
            />
            <p>
              {isEn
                ? "A project, job opportunity, or tech idea? I'd love to connect."
                : "مشروع، فرصة وظيفية، أو فكرة تقنية؟ يسعدني التواصل معك."}
            </p>
            <div className="contact-buttons">
              {info.email && (
                <a
                  href={`mailto:${info.email}`}
                  onClick={() => navigator.clipboard?.writeText(info.email)}
                >
                  ✉ {info.email}
                </a>
              )}
              {info.linkedin && (
                <a href={fixUrl(info.linkedin)} target="_blank" rel="noreferrer">
                  in LinkedIn
                </a>
              )}
              {info.phone && waLink(info.phone) && (
                <a href={waLink(info.phone)} target="_blank" rel="noreferrer">
                  💬 WhatsApp
                </a>
              )}
              {info.github && (
                <a href={fixUrl(info.github)} target="_blank" rel="noreferrer">
                  ◇ GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
