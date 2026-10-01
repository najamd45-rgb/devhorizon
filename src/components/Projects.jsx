import Section from "./Section";
import ProjectCard from "./ProjectCard";
import { useProjects } from "../store";

export default function Projects() {
  const { list: all, loading } = useProjects();
  const list = all.filter((p) => p.visible !== false);
  return (
    <Section id="projects" title="Projects" sub="Some of our completed React JS projects. Tap a project to see more." alt>
      {loading ? (
        <div className="empty">Loading projects…</div>
      ) : list.length === 0 ? (
        <div className="empty">🚧 Projects will appear here soon.</div>
      ) : (
        <div className="grid pgrid">
          {list.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </Section>
  );
}
