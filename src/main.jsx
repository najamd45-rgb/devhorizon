import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Allow  https://site.com/admin  (without #) to open the admin panel too
if (window.location.pathname.replace(/\/+$/, "") === "/admin" && !window.location.hash) {
  window.history.replaceState(null, "", "/#/admin");
}

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="adm-login">
          <div className="card" style={{ maxWidth: 480 }}>
            <h2>Something went wrong</h2>
            <p className="muted">{String(this.state.error.message || this.state.error)}</p>
            <a className="btn p" href="/">Back to website</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
