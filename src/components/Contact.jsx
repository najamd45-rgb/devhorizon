import Section from "./Section";
import { CONTACT } from "../data";

export default function Contact() {
  return (
    <Section id="contact" title="Contact Us" sub="Have a project in mind? Let's talk.">
      <div className="contact">
        <a className="card" href={"https://instagram.com/" + CONTACT.insta} target="_blank" rel="noopener noreferrer">
          <div className="ico">📩</div>
          <h3>DM us on Instagram</h3>
          <b>@{CONTACT.insta}</b>
        </a>
        <a className="card" href={"https://wa.me/" + CONTACT.waLink} target="_blank" rel="noopener noreferrer">
          <div className="ico">📱</div>
          <h3>WhatsApp</h3>
          <b>{CONTACT.wa}</b>
        </a>
        <a className="card" href={"mailto:" + CONTACT.mail}>
          <div className="ico">📧</div>
          <h3>Email</h3>
          <b>{CONTACT.mail}</b>
        </a>
      </div>
    </Section>
  );
}
