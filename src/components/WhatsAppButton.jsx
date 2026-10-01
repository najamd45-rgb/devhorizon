import { CONTACT } from "../data";

export default function WhatsAppButton() {
  return (
    <a
      className="wa-fab"
      href={"https://wa.me/" + CONTACT.waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
