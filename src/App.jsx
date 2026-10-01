import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import About from "./components/About";
import Team from "./components/Team";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectPage from "./components/ProjectPage";
import WhatsAppButton from "./components/WhatsAppButton";
// Admin code is loaded only when /#/admin is opened (not part of the public bundle)
const Admin = lazy(() => import("./admin/Admin"));
import { useRoute, consumePending, scrollToSection } from "./router";

function Home() {
  useEffect(() => {
    const target = consumePending();
    if (target) requestAnimationFrame(() => scrollToSection(target, false));
  }, []);
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <About />
      <Team />
      <Reviews />
      <Contact />
    </>
  );
}

export default function App() {
  const path = useRoute();

  // new page -> start at the top (Home handles its own scroll target)
  useEffect(() => {
    if (path !== "/") window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  if (path.startsWith("/admin")) {
    return (
      <Suspense fallback={<div className="adm-login"><p className="muted">Loading…</p></div>}>
        <Admin />
      </Suspense>
    );
  }

  const projectMatch = path.match(/^\/project\/([^/]+)/);
  return (
    <>
      <Navbar />
      {projectMatch ? <ProjectPage id={decodeURIComponent(projectMatch[1])} /> : <Home />}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
