export default function Cards({ items }) {
  return (
    <div className="grid">
      {items.map((i) => (
        <div className="card" key={i.title}>
          <div className="ico">{i.icon}</div>
          <h3>{i.title}</h3>
          <p>{i.text}</p>
          {i.url && (
            <a className="soon" href={i.url} target="_blank" rel="noopener noreferrer">
              View project →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
