import { useState } from "react";
import { useProjects, useReviews, importAll } from "../store";

export default function BackupTab() {
  const projects = useProjects().list;
  const reviews = useReviews().list;
  const [msg, setMsg] = useState(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ projects, reviews }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "devhorizon-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    let d;
    try {
      d = JSON.parse(await file.text());
      if (!Array.isArray(d.projects) || !Array.isArray(d.reviews)) throw new Error();
    } catch { return setMsg({ t: "This file is not a valid DevHorizon backup." }); }
    const r = await importAll(d);
    setMsg(r.ok ? { ok: true, t: "Backup restored to Firebase." } : { t: r.error });
  };

  return (
    <section>
      <div className="adm-bar"><h2>Backup</h2></div>
      <div className="card note">
        <b>Your data is stored in Firebase</b>
        <p>
          Projects and reviews are saved in Firestore, so they show on every device. Download a backup file now and then.
          Restoring a backup adds/updates the items inside it (it does not delete other items).
        </p>
      </div>
      <div className="backup-actions">
        <button className="btn p" onClick={exportJson}>⬇ Download backup</button>
        <label className="btn o filebtn">⬆ Restore backup<input type="file" accept="application/json" onChange={importJson} hidden /></label>
      </div>
      {msg && <div className={msg.ok ? "okmsg" : "err"}>{msg.t}</div>}
    </section>
  );
}
