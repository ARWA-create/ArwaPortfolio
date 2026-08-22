import { info } from "../data/info";

export default function Footer({ lang }) {
  const isEn = lang === "en";
  return (
    <footer className="portfolio-footer">
      <div className="container">
        <span>© 2026 {isEn ? info.nameEn : info.name}</span>
        <span>Software Engineer</span>
      </div>
    </footer>
  );
}
