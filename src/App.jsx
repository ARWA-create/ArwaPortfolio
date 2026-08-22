import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import "./App.css";

export default function App() {
  const [lang, setLang] = useState("ar");

  return (
    <div dir={lang === "en" ? "ltr" : "rtl"} lang={lang}>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Stats />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Skills lang={lang} />
        <Certifications lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <ScrollTop />
    </div>
  );
}
