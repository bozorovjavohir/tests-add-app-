import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Bosh sahifa" },
    { path: "/sections", label: "Bo‘limlar" },
    { path: "/tests", label: "Testlar" },
    { path: "/create-test", label: "Test yaratish" },
    { path: "/archive", label: "Arxiv" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
        <span>Test</span>
        <strong>System</strong>
      </Link>

      <button
        className="navbar-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menyuni ochish"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
        {links.map((link) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={`navbar-link ${active ? "navbar-link-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
