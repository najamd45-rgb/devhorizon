import { useState } from "react";
import { useReviews, addReview, deleteReview } from "../store";

export default function ReviewsTab() {
  const { list: reviews, error: loadErr } = useReviews();
  const [f, setF] = useState({ name: "", text: "", rating: 5 });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const add = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.text.trim()) return setErr("Name and review text are required.");
    setBusy(true);
    const r = await addReview({ name: f.name.trim(), text: f.text.trim(), rating: Number(f.rating) });
    setBusy(false);
    if (!r.ok) return setErr(r.error);
    setF({ name: "", text: "", rating: 5 }); setErr("");
  };
  const remove = async (r) => {
    if (!confirm("Delete review from " + r.name + "?")) return;
    const res = await deleteReview(r.id);
    if (!res.ok) setErr(res.error);
  };

  return (
    <section>
      <div className="adm-bar"><h2>Reviews</h2></div>
      {loadErr && <div className="err">{loadErr}</div>}
      <form className="card rform" onSubmit={add}>
        <div className="row2">
          <label>Client name<input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
          <label className="icon-f">Rating
            <select value={f.rating} onChange={(e) => setF({ ...f, rating: e.target.value })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
            </select>
          </label>
        </div>
        <label>Review<textarea rows={3} value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} /></label>
        {err && <div className="err">{err}</div>}
        <button className="btn p sm" type="submit" disabled={busy}>{busy ? "Saving…" : "+ Add review"}</button>
      </form>

      {reviews.length === 0 && <div className="empty">No reviews yet.</div>}
      <div className="list">
        {reviews.map((r) => (
          <div className="item" key={r.id}>
            <div className="item-info">
              <b>{r.name} <span className="stars">{"★".repeat(r.rating || 5)}</span></b>
              <span>{r.text}</span>
            </div>
            <div className="item-actions"><button className="ibtn danger" onClick={() => remove(r)}>Delete</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}
