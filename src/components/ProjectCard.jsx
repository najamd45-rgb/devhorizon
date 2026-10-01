import { Link } from "../router";
import ProjectThumb from "./ProjectThumb";

export default function ProjectCard({ project }) {
  const tech = project.tech || [];
  return (
    <Link to={"/project/" + project.id} className="card pcard" aria-label={"Open " + project.title}>
      <ProjectThumb project={project} />
      <div className="pbody">
        <h3>{project.title}</h3>
        <p>{project.text}</p>
        {tech.length > 0 && (
          <div className="chips">
            {tech.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
          </div>
        )}
        <span className="more">View project →</span>
      </div>
    </Link>
  );
}
