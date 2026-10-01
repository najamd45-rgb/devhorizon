import { useState } from "react";
import { navLinks } from "../data";
import { SectionLink } from "../router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav>
      <div className="wrap">
        <SectionLink id="home" className="logo" onClick={close}>
          <img src="/logo.png" alt="" className="logo-img" width="38" height="38" />
          <span>Dev<span className="grad">Horizon</span></span>
        </SectionLink>
        <button
          className="burger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
        <div className={"links" + (open ? " open" : "")}>
          {navLinks.map((n) => (
            <SectionLink key={n} id={n} onClick={close}>
              {n[0].toUpperCase() + n.slice(1)}
            </SectionLink>
          ))}
          <SectionLink id="contact" className="btn p nav-cta" onClick={close}>
            Hire us
          </SectionLink>
        </div>
      </div>
    </nav>
  );
}
