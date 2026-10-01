export default function Section({ id, title, sub, alt, children }) {
  return (
    <section id={id} className={alt ? "alt" : ""}>
      <div className="wrap">
        <h2>{title}</h2>
        {sub && <p className="sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
