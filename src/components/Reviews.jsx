import Section from "./Section";
import { useReviews } from "../store";

export default function Reviews() {
  const { list: reviews, loading } = useReviews();
  return (
    <Section id="reviews" title="Reviews" sub="What our clients say." alt>
      {loading ? (
        <div className="empty">Loading reviews…</div>
      ) : reviews.length === 0 ? (
        <div className="empty">⭐ Client reviews will appear here soon.</div>
      ) : (
        <div className="grid">
          {reviews.map((r) => (
            <div className="card" key={r.id || r.name}>
              <div className="stars" aria-label={(r.rating || 5) + " out of 5"}>
                {"★".repeat(r.rating || 5)}{"☆".repeat(5 - (r.rating || 5))}
              </div>
              <p>“{r.text}”</p>
              <h3 style={{ marginTop: 12 }}>{r.name}</h3>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
