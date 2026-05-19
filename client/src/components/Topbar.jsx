// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faExpand,
//   faCompress,
//   faMoon,
//   faSun
// } from "@fortawesome/free-solid-svg-icons";

// function Topbar() {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   /* ---------- Fullscreen ---------- */
//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   /* ---------- Dark Mode ---------- */
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   return (
//     <div className="topbar">
//       <h2 className="page-title">Dashboard</h2>

//       <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
//         {/* Dark Mode Toggle */}
//         <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
//           <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
//         </button>

//         {/* Fullscreen Toggle */}
//         <button className="icon-btn" onClick={toggleFullscreen}>
//           <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Topbar;
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUserCircle,
  faMoon,
  faSun,
  faExpand,
  faCompress
} from "@fortawesome/free-solid-svg-icons";

function Topbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [fullscreen, setFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    "New member joined",
    "Payment received",
    "Membership expiring"
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="topbar">
      <h2 className="page-title">Dashboard</h2>

      <div className="topbar-actions">
        {/* Dark Mode */}
        <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>

        {/* Fullscreen */}
        <button className="icon-btn" onClick={toggleFullscreen}>
          <FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} />
        </button>

        {/* Notifications */}
        <div className="dropdown">
          <button
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FontAwesomeIcon icon={faBell} />
            <span className="badge">{notifications.length}</span>
          </button>

          {showNotifications && (
            <div className="dropdown-menu">
              {notifications.map((n, i) => (
                <p key={i}>{n}</p>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="dropdown">
          <button
            className="icon-btn"
            onClick={() => setShowProfile(!showProfile)}
          >
            <FontAwesomeIcon icon={faUserCircle} />
          </button>

          {showProfile && (
            <div className="dropdown-menu">
              <p>Admin</p>
              <p>Settings</p>
              <p
                className="logout-link"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
