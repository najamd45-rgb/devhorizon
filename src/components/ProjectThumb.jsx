// Image if the project has one, otherwise a gradient tile with the emoji icon.
export default function ProjectThumb({ project, className = "" }) {
  return (
    <div className={"thumb " + className}>
      {project.image ? (
        <img src={project.image} alt={project.title} loading="lazy" />
      ) : (
        <span className="thumb-ico" aria-hidden="true">{project.icon || "🚀"}</span>
      )}
    </div>
  );
}
