// ---------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------
export const CONTACT = {
  insta: "devhorizon37",
  wa: "03474715768",
  waLink: "923474715768",
  mail: "najamd45@gmail.com",
};

export const navLinks = ["services", "projects", "about", "team", "reviews", "contact"];

export const services = [
  { icon: "⚛️", title: "React JS Development", text: "Fast, component-based web apps built with React." },
  { icon: "🌐", title: "Business Websites", text: "Professional websites that present your brand online." },
  { icon: "🛒", title: "E-Commerce Websites", text: "Online stores with product pages, cart and checkout flow." },
  { icon: "📱", title: "Responsive Web Design", text: "Layouts that look great on mobile, tablet and desktop." },
  { icon: "🔥", title: "Firebase Integration", text: "Authentication, database and hosting with Firebase." },
  { icon: "🎨", title: "UI/UX & Frontend Development", text: "Clean, user-friendly interfaces with modern design." },
  { icon: "🚀", title: "Website Deployment", text: "We take your site live and make sure it runs smoothly." },
];

// ---------------------------------------------------------------
// SAMPLE projects. The website reads projects from Firebase.
// In /admin -> Projects you can click "Load sample projects" to add these once.
// Fields: id, icon, title, text (short), details (long, new line = new paragraph),
//         tech (list), url (live link), repo (source link), image (url), visible
// ---------------------------------------------------------------
export const projects = [
  {
    id: "ecommerce-store", icon: "🛒", title: "E-Commerce Store",
    text: "A complete online store built with React JS.",
    details:
      "A full online store with a product listing, product detail pages, a shopping cart and a simple checkout flow.\nBuilt with React JS and designed to feel fast on phones and desktops.",
    tech: ["React JS", "Firebase", "Responsive UI"], url: "", repo: "", image: "", visible: true,
  },
  {
    id: "business-website", icon: "💻", title: "Business Website",
    text: "A modern company website for a business client.",
    details:
      "A clean, professional website that presents a company, its services and contact details.\nFocused on trust, clarity and easy ways for customers to reach out.",
    tech: ["React JS", "CSS", "SEO basics"], url: "", repo: "", image: "", visible: true,
  },
  {
    id: "responsive-website", icon: "📱", title: "Responsive Website",
    text: "A fully responsive site for every screen size.",
    details:
      "A layout that adapts smoothly from small phones to large desktop screens.\nTested on multiple screen sizes so every visitor gets a great experience.",
    tech: ["React JS", "CSS Grid", "Flexbox"], url: "", repo: "", image: "", visible: true,
  },
  {
    id: "react-js-apps", icon: "⚛️", title: "React JS Apps",
    text: "Interactive single-page applications.",
    details:
      "Interactive single-page applications with fast navigation and reusable components.\nBuilt to be easy to maintain and extend as your needs grow.",
    tech: ["React JS", "Vite", "Hooks"], url: "", repo: "", image: "", visible: true,
  },
  {
    id: "firebase-projects", icon: "🔥", title: "Firebase Projects",
    text: "Apps powered by Firebase backend services.",
    details:
      "Apps that use Firebase for login, a real-time database and hosting.\nNo server to manage — just a reliable backend that scales.",
    tech: ["Firebase", "Auth", "Firestore"], url: "", repo: "", image: "", visible: true,
  },
];


// ---------------------------------------------------------------
// Team (edit names, numbers and photos here; photos live in /public/team)
// ---------------------------------------------------------------
export const TEAM_SIZE = "5 to 10";

export const team = [
  {
    name: "Najamud Din",
    role: "CEO & Founder",
    degree: "BSCS",
    university: "Ibadat International University, Islamabad",
    phone: "03151003757",
    waLink: "923151003757",
    photo: "/team/najam.jpg",
  },
  {
    name: "Aliza Wali",
    role: "Co-Founder",
    degree: "BSCSE",
    university: "Mirpur University of Science and Technology",
    phone: "03100977004",
    waLink: "923100977004",
    photo: "/team/aliza.jpg",
  },
];
