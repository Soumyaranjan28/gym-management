import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AdminLayout.css";
import { 
  FiGrid, 
  FiUserPlus, 
  FiClock, 
  FiUsers, 
  FiCreditCard, 
  FiPieChart, 
  FiLogOut, 
  FiMenu 
} from "react-icons/fi";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <FiGrid className="nav-icon" /> },
    { path: "/admin/add-member", label: "Add Member", icon: <FiUserPlus className="nav-icon" /> },
    { path: "/admin/pending", label: "Pending Members", icon: <FiClock className="nav-icon" /> },
    { path: "/admin/members", label: "Members", icon: <FiUsers className="nav-icon" /> },
    { path: "/admin/payments", label: "Payments", icon: <FiCreditCard className="nav-icon" /> },
    { path: "/admin/reports", label: "Reports", icon: <FiPieChart className="nav-icon" /> },
  ];

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="logo">Gym Master 💪</div>

        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li 
                key={item.path}
                className={isActive ? "active" : ""}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              >
                {item.icon} {item.label}
              </li>
            );
          })}

          <li
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/login");
            }}
          >
            <FiLogOut className="nav-icon" /> Logout
          </li>
        </ul>
      </div>

      {/* MAIN CONTAINER */}
      <div className="main-content">
        {/* MOBILE TOPBAR CONTROLLER */}
        <div className="topbar-header">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
