import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";

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

function ImageShowcase({ images, projIdx, onOpen, featuredIndexes = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);

  function switchImg(idx) {
    setOpacity(0);
    setTimeout(() => {
      setActiveIdx(idx);
      setOpacity(1);
    }, 180);
  }

  if (!images || images.length === 0) return null;

  return (
    <div className="handball-visual">
      <div className="img-showcase">
        <div
          className="img-main"
          onClick={() => onOpen(projIdx, activeIdx)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={images[activeIdx]}
            alt=""
            style={{ opacity, transition: "opacity .18s ease, transform .18s ease" }}
          />
          <div className="img-overlay"><span>↗</span></div>
          <div className="img-counter">{activeIdx + 1} / {images.length}</div>
        </div>
        {images.length > 1 && (
          <div className="img-thumbs">
            {images.map((img, t) => (
              <div
                key={t}
                className={`img-thumb${t === activeIdx ? " active" : ""}${featuredIndexes.includes(t) ? " img-thumb-featured" : ""}`}
                onClick={() => switchImg(t)}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, projIdx, lang, onOpen }) {
  const ref = useRef(null);
  useReveal(ref);
  const isEn = lang === "en";

  const title = isEn ? (project.titleEn || project.title) : project.title;
  const description = isEn ? (project.descriptionEn || project.description) : project.description;
  const tags = isEn ? (project.tagsEn || project.tags) : project.tags;
  const isFeatured = project.isFeatured;

  const cardClass = isFeatured
    ? "project-card handball-card handball-wide"
    : "project-card project-wide";

  return (
    <div className={cardClass} ref={ref}>
      <div className="handball-layout">
        {isFeatured && (
          <ImageShowcase
            images={project.images}
            projIdx={projIdx}
            onOpen={onOpen}
            featuredIndexes={project.featuredIndexes}
          />
        )}

        <div className="handball-content">
          <div className="project-meta">
            {project.badgeText && (
              <div className={`project-badge${project.badgeType === "concept" ? " concept-badge" : ""}`}>
                {project.badgeText}
              </div>
            )}
            {project.year && <span className="project-year">{project.year}</span>}
          </div>
          <h3>{title}</h3>
          <p
            className="handball-desc"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {tags && (
            <div className="project-tags">
              {tags.split(",").map((t, i) => <span key={i}>{t.trim()}</span>)}
            </div>
          )}
          {project.links?.length > 0 && (
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  {isEn ? (link.labelEn || link.label) : link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {!isFeatured && project.images && project.images.length > 0 && (
          <ImageShowcase
            images={project.images}
            projIdx={projIdx}
            onOpen={onOpen}
            featuredIndexes={project.featuredIndexes}
          />
        )}
      </div>
    </div>
  );
}

function Lightbox({ images, index, onClose, onNav }) {
  const [opacity, setOpacity] = useState(1);
  const [currentSrc, setCurrentSrc] = useState(images[index]);

  useEffect(() => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentSrc(images[index]);
      setOpacity(1);
    }, 150);
  }, [index, images]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNav]);

  return (
    <div className="lightbox open" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>✕</button>
        {images.length > 1 && (
          <button className="lightbox-arrow lb-prev" onClick={() => onNav(-1)}>‹</button>
        )}
        <img
          src={currentSrc}
          alt=""
          style={{ opacity, transition: "opacity .15s ease" }}
        />
        {images.length > 1 && (
          <button className="lightbox-arrow lb-next" onClick={() => onNav(1)}>›</button>
        )}
        <p id="lightboxCaption">صفحة {index + 1}</p>
        <div className="lightbox-counter">{index + 1} / {images.length}</div>
      </div>
    </div>
  );
}

export default function Projects({ lang }) {
  const isEn = lang === "en";
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  const [lightbox, setLightbox] = useState(null);

  function openLightbox(projIdx, imgIdx) {
    const imgs = sorted[projIdx]?.images;
    if (!imgs || imgs.length === 0) return;
    setLightbox({ images: imgs, index: imgIdx });
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  function navLightbox(dir) {
    setLightbox((prev) => {
      if (!prev) return null;
      const next = (prev.index + dir + prev.images.length) % prev.images.length;
      return { ...prev, index: next };
    });
  }

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-heading">
          <span>02 — PROJECTS</span>
          <h2>{isEn ? "Projects" : "المشاريع"}</h2>
          <p>
            {isEn
              ? "Software projects built end-to-end using .NET and enterprise solutions."
              : "مشاريع برمجية نفّذتها بشكل كامل باستخدام تقنيات .NET وحلول مؤسسية."}
          </p>
        </div>

        <div className="projects-grid projects-grid-2">
          {sorted.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              projIdx={idx}
              lang={lang}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}
    </section>
  );
}
