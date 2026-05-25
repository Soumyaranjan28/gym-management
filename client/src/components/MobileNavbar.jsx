import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";

function MobileNavbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="topbar">

      {/* LOGO */}
      <div className="logo">
        eFitness 💪
      </div>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* NAVIGATION */}
      <div className={`top-links ${menuOpen ? "active" : ""}`}>

        <Link
          to="/member"
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </Link>

        <Link
          to="/workouts"
          onClick={() => setMenuOpen(false)}
        >
          Workouts
        </Link>

        <Link
          to="/profile"
          onClick={() => setMenuOpen(false)}
        >
          Profile
        </Link>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default MobileNavbar;