import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AdminLayout.css";
import "../styles/AdminLayout.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}

      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">Gym Master</div>

        <ul>
          <li onClick={() => navigate("/admin")}>🏠 Dashboard</li>

          <li onClick={() => navigate("/admin/add-member")}>➕ Add Member</li>

          <li onClick={() => navigate("/admin/pending")}>⏳ Pending Members</li>

          <li onClick={() => navigate("/admin/members")}>👥 Members</li>

          <li>💳 Payments</li>

          <li>📊 Reports</li>

          <li
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}

      <div className="main-content">
        {/* TOPBAR */}

        <div className="top-left">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
