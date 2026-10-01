import { useProjects } from "../store";
import { Link, SectionLink } from "../router";
import { CONTACT } from "../data";
import ProjectThumb from "./ProjectThumb";
import ProjectCard from "./ProjectCard";

export default function ProjectPage({ id }) {
  const { list: all, loading } = useProjects();
  const project = all.find((p) => p.id === id);

  if (loading) {
    return <main className="wrap pp"><div className="empty">Loading…</div></main>;
  }

  if (!project || (project.visible === false)) {
    return (
      <main className="wrap pp">
        <div className="empty">
          <h3>Project not found</h3>
          <p>This project may have been removed.</p>
          <SectionLink id="projects" className="btn p">← Back to projects</SectionLink>
        </div>
      </main>
    );
  }

  const others = all.filter((p) => p.id !== id && p.visible !== false).slice(0, 3);
  const paragraphs = (project.details || project.text || "").split("\n").filter((l) => l.trim());
  const waText = encodeURIComponent("Hi DevHorizon, I liked your \"" + project.title + "\" project and want something similar.");

  return (
    <main className="pp">
      <div className="wrap">
        <SectionLink id="projects" className="back">← All projects</SectionLink>

        <div className="pp-grid">
          <ProjectThumb project={project} className="big" />
          <div className="pp-info">
            <h1>{project.title}</h1>
            <p className="lead">{project.text}</p>
            {(project.tech || []).length > 0 && (
              <div className="chips">
                {project.tech.map((t) => <span key={t}>{t}</span>)}
              </div>
            )}
            <div className="pp-actions">
              {project.url && (
                <a className="btn p" href={project.url} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
              )}
              {project.repo && (
                <a className="btn o" href={project.repo} target="_blank" rel="noopener noreferrer">Source code</a>
              )}
              <a className="btn o" href={"https://wa.me/" + CONTACT.waLink + "?text=" + waText} target="_blank" rel="noopener noreferrer">
                Want something similar?
              </a>
            </div>
          </div>
        </div>

        <section className="pp-about">
          <h2>About this project</h2>
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </section>

        {others.length > 0 && (
          <section className="pp-more">
            <h2>More projects</h2>
            <div className="grid pgrid">
              {others.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
