import { SectionLink } from "../router";

const tags = ["⚛️ React JS", "🌐 Web Development", "🛒 E-Commerce", "💡 Digital Solutions"];

export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="wrap">
        <h1>
          Welcome to <span className="grad">DevHorizon</span> 🚀
        </h1>
        <p>We build modern, responsive and user-friendly websites using modern web technologies.</p>
        <div className="tags">
          {tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <SectionLink id="contact" className="btn p">Get in Touch</SectionLink>
        <SectionLink id="projects" className="btn o">View Projects</SectionLink>
      </div>
    </header>
  );
}
