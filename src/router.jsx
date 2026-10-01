import { useEffect, useState } from "react";

// Tiny hash router (no extra dependency). URLs look like  /#/project/my-id
const parse = () => {
  const h = window.location.hash.replace(/^#/, "");
  return h.startsWith("/") ? h : "/";
};

export function useRoute() {
  const [path, setPath] = useState(parse);
  useEffect(() => {
    const on = () => setPath(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return path;
}

export const navigate = (to) => { window.location.hash = to; };

export function Link({ to, children, ...rest }) {
  return <a href={"#" + to} {...rest}>{children}</a>;
}

// --- scrolling to home-page sections from any page ---
let pending = null;
export const consumePending = () => { const p = pending; pending = null; return p; };

export function scrollToSection(id, smooth = true) {
  const el = id && id !== "home" ? document.getElementById(id) : null;
  if (el) el.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  else window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });
}

export function goSection(id) {
  if (parse() === "/") scrollToSection(id);
  else { pending = id; navigate("/"); }
}

// <a> that goes to a section of the home page
export function SectionLink({ id, children, onClick, ...rest }) {
  return (
    <a
      href={"#/" }
      onClick={(e) => { e.preventDefault(); goSection(id); onClick && onClick(e); }}
      {...rest}
    >
      {children}
    </a>
  );
}
