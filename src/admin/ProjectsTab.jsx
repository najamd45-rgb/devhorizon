import { useEffect, useState } from "react";
import { useProjects, saveProject, deleteProject, swapProjects, toggleProject, loadSampleProjects, uid, slugify } from "../store";
import { fileToDataUrl } from "./imageUtil";
import ProjectThumb from "../components/ProjectThumb";

const EMPTY = { icon: "🚀", title: "", text: "", details: "", tech: "", url: "", repo: "", image: "", visible: true };
const fixUrl = (u) => { u = u.trim(); return u && !/^https?:\/\//i.test(u) ? "https://" + u : u; };

function ProjectForm({ initial, onSave, onClose }) {
  const [f, setF] = useState({ ...EMPTY, ...initial, tech: (initial.tech || []).join(", ") });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pickImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBusy(true); setErr("");
    try { setF((p) => ({ ...p, image: "" })); const d = await fileToDataUrl(file); setF((p) => ({ ...p, image: d })); }
    catch (ex) { setErr(ex.message); }
    setBusy(false);
    e.target.value = "";
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!f.title.trim()) return setErr("Title is required.");
    const item = {
      ...f,
      id: f.id || slugify(f.title) + "-" + uid().slice(-4),
      title: f.title.trim(),
      text: f.text.trim(),
      icon: f.icon.trim() || "🚀",
      tech: f.tech.split(",").map((t) => t.trim()).filter(Boolean),
      url: fixUrl(f.url),
      repo: fixUrl(f.repo),
      order: f.order ?? Date.now(),
    };
    setBusy(true);
    const res = await onSave(item);
    setBusy(false);
    if (res) setErr(res);
  };

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal-box" onSubmit={submit}>
        <div className="modal-head">
          <h3>{initial.id ? "Edit project" : "Add project"}</h3>
          <button type="button" className="x" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="row2">
          <label className="icon-f">Icon (emoji)<input value={f.icon} onChange={set("icon")} maxLength={4} /></label>
          <label>Title *<input value={f.title} onChange={set("title")} placeholder="e.g. Restaurant Website" /></label>
        </div>
        <label>Short description (shown on the card)
          <input value={f.text} onChange={set("text")} placeholder="One line about the project" />
        </label>
        <label>Full details (new line = new paragraph)
          <textarea rows={5} value={f.details} onChange={set("details")} placeholder="Explain what you built, features, results…" />
        </label>
        <label>Technologies (comma separated)
          <input value={f.tech} onChange={set("tech")} placeholder="React JS, Firebase, CSS" />
        </label>
        <div className="row2">
          <label>Live link<input value={f.url} onChange={set("url")} placeholder="https://example.com" /></label>
          <label>Source code link<input value={f.repo} onChange={set("repo")} placeholder="https://github.com/…" /></label>
        </div>

        <div className="imgbox">
          <ProjectThumb project={f} className="mini" />
          <div className="imgctl">
            <label className="btn o sm filebtn">
              {busy ? "Please wait…" : "Upload image"}
              <input type="file" accept="image/*" onChange={pickImage} hidden />
            </label>
            {f.image && <button type="button" className="btn o sm" onClick={() => setF({ ...f, image: "" })}>Remove image</button>}
            <input
              placeholder="…or paste an image URL"
              value={f.image.startsWith("data:") ? "" : f.image}
              onChange={set("image")}
            />
          </div>
        </div>

        <label className="check">
          <input type="checkbox" checked={f.visible !== false} onChange={(e) => setF({ ...f, visible: e.target.checked })} />
          Show this project on the website
        </label>

        {err && <div className="err">{err}</div>}
        <div className="modal-foot">
          <button type="button" className="btn o" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn p" disabled={busy}>{busy ? "Saving…" : "Save project"}</button>
        </div>
      </form>
    </div>
  );
}

export default function ProjectsTab() {
  const { list: projects, loading, error: loadErr } = useProjects();
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  const check = (r) => { setMsg(r.ok ? "" : r.error); return r.ok ? null : r.error; };

  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= projects.length) return;
    swapProjects(projects[i], projects[j]).then(check);
  };
  const remove = (p) => {
    if (confirm('Delete "' + p.title + '"? This cannot be undone.')) deleteProject(p.id).then(check);
  };
  const toggle = (p) => toggleProject(p).then(check);
  const sample = () => loadSampleProjects().then(check);
  const onSave = async (item) => {
    const err = check(await saveProject(item));
    if (!err) setEditing(null);
    return err;
  };

  return (
    <section>
      <div className="adm-bar">
        <h2>Projects</h2>
        <button className="btn p sm" onClick={() => setEditing({})}>+ Add project</button>
      </div>
      {(msg || loadErr) && <div className="err">{msg || loadErr}</div>}

      {loading && <div className="empty">Loading…</div>}
      {!loading && projects.length === 0 && !loadErr && (
        <div className="empty">
          <h3>No projects yet</h3>
          <p>Click “Add project”, or start with the sample projects.</p>
          <button className="btn o sm" onClick={sample}>Load sample projects</button>
        </div>
      )}
      <div className="list">
        {projects.map((p, i) => (
          <div className={"item" + (p.visible === false ? " hidden" : "")} key={p.id}>
            <ProjectThumb project={p} className="mini" />
            <div className="item-info">
              <b>{p.title}</b>
              <span>{p.text}</span>
              {p.visible === false && <em>Hidden from website</em>}
            </div>
            <div className="item-actions">
              <button className="ibtn" title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
              <button className="ibtn" title="Move down" onClick={() => move(i, 1)} disabled={i === projects.length - 1}>↓</button>
              <button className="ibtn" onClick={() => toggle(p)}>{p.visible === false ? "Show" : "Hide"}</button>
              <button className="ibtn" onClick={() => setEditing(p)}>Edit</button>
              <button className="ibtn danger" onClick={() => remove(p)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && <ProjectForm initial={editing} onSave={onSave} onClose={() => setEditing(null)} />}
    </section>
  );
}
