import { useState } from "react";
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth, isConfigured } from "../firebase";
import { Link } from "../router";
import { useProjects, useReviews } from "../store";
import { useAdmin } from "./useAdmin";
import ProjectsTab from "./ProjectsTab";
import ReviewsTab from "./ReviewsTab";
import BackupTab from "./BackupTab";

const loginError = (code) => {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-email": return "Wrong email or password.";
    case "auth/too-many-requests": return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed": return "Network error. Check your internet connection.";
    default: return "Login failed. Please try again.";
  }
};

function Shell({ children }) {
  return <div className="adm-login">{children}</div>;
}

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr(""); setInfo("");
    try { await signInWithEmailAndPassword(auth, email.trim(), pw); }
    catch (ex) { setErr(loginError(ex.code)); }
    setBusy(false);
  };

  const reset = async () => {
    if (!email.trim()) return setErr("Type your email first, then click “Forgot password”.");
    try { await sendPasswordResetEmail(auth, email.trim()); setErr(""); setInfo("If this email exists, a reset link has been sent."); }
    catch { setErr("Could not send reset email."); }
  };

  return (
    <Shell>
      <form className="card" onSubmit={submit}>
        <img src="/logo.png" alt="DevHorizon" className="login-logo" width="84" height="84" />
        <h2>Admin login</h2>
        <p className="muted">Only the website admin can sign in here.</p>
        <input type="email" value={email} autoFocus placeholder="Admin email" autoComplete="username"
          onChange={(e) => { setEmail(e.target.value); setErr(""); }} required />
        <input type="password" value={pw} placeholder="Password" autoComplete="current-password"
          onChange={(e) => { setPw(e.target.value); setErr(""); }} required />
        {err && <div className="err">{err}</div>}
        {info && <div className="okmsg">{info}</div>}
        <button className="btn p" type="submit" disabled={busy}>{busy ? "Signing in…" : "Login"}</button>
        <button type="button" className="linkbtn" onClick={reset}>Forgot password?</button>
        <Link to="/" className="back">← Back to website</Link>
      </form>
    </Shell>
  );
}

function Denied({ user }) {
  return (
    <Shell>
      <div className="card">
        <div className="ico">⛔</div>
        <h2>Access denied</h2>
        <p className="muted">
          <b>{user?.email}</b> is not an admin of this website.
        </p>
        <button className="btn p" onClick={() => signOut(auth)}>Logout</button>
        <Link to="/" className="back">← Back to website</Link>
      </div>
    </Shell>
  );
}

function Dashboard({ user }) {
  const [tab, setTab] = useState("projects");
  const projects = useProjects().list;
  const reviews = useReviews().list;
  const visible = projects.filter((p) => p.visible !== false).length;

  return (
    <div className="adm">
      <header className="adm-top">
        <div className="wrap">
          <span className="logo"><img src="/logo.png" alt="" className="logo-img" width="34" height="34" /><span>Dev<span className="grad">Horizon</span> <small>Admin</small></span></span>
          <div className="adm-right">
            <span className="adm-user">{user.email}</span>
            <Link to="/" className="btn o sm">View website</Link>
            <button className="btn o sm" onClick={() => signOut(auth)}>Logout</button>
          </div>
        </div>
      </header>

      <div className="wrap adm-body">
        <div className="stats">
          <div className="card"><b>{projects.length}</b><span>Projects</span></div>
          <div className="card"><b>{visible}</b><span>Visible on site</span></div>
          <div className="card"><b>{reviews.length}</b><span>Reviews</span></div>
        </div>

        <div className="tabs" role="tablist">
          {[["projects", "Projects"], ["reviews", "Reviews"], ["backup", "Backup"]].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>
              {l}
            </button>
          ))}
        </div>

        {tab === "projects" && <ProjectsTab />}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "backup" && <BackupTab />}
      </div>
    </div>
  );
}

export default function Admin() {
  const { status, user } = useAdmin();

  if (!isConfigured) {
    return (
      <Shell>
        <div className="card">
          <div className="ico">🔥</div>
          <h2>Firebase not connected</h2>
          <p className="muted">
            Create a <code>.env</code> file with your Firebase keys (see <code>.env.example</code> and README), then restart <code>npm run dev</code>.
          </p>
          <Link to="/" className="back">← Back to website</Link>
        </div>
      </Shell>
    );
  }
  if (status === "loading") return <Shell><p className="muted">Checking access…</p></Shell>;
  if (status === "out") return <Login />;
  if (status === "denied") return <Denied user={user} />;
  return <Dashboard user={user} />;
}
