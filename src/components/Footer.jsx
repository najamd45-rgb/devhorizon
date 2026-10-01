import { Link } from "../router";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <span>© {new Date().getFullYear()} DevHorizon. All rights reserved.</span>
        <Link to="/admin" className="adminlink">Admin</Link>
      </div>
    </footer>
  );
}
