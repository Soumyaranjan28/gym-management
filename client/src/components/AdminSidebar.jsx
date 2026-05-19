// import { NavLink, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// import {
//   faHome,
//   faUserPlus,
//   faUsers,
//   faCalendar,
//   faMoneyBill,
//   faChartBar,
//   faSignOutAlt,
//   faBars
// } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";

// function Sidebar() {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <div className="sidebar-header">
//         {!collapsed && <h2>Gym Master</h2>}
//         <button onClick={() => setCollapsed(!collapsed)}>
//           <FontAwesomeIcon icon={faBars} />
//         </button>
//       </div>

//       <nav>
//         <NavLink to="/admin">
//           <FontAwesomeIcon icon={faHome} />
//           {!collapsed && "Home"}
//         </NavLink>

//         <NavLink to="#">
//           <FontAwesomeIcon icon={faUserPlus} />
//           {!collapsed && "Add Member"}
//         </NavLink>

//         <NavLink to="#">
//           <FontAwesomeIcon icon={faUsers} />
//           {!collapsed && "Members"}
//         </NavLink>

//         <NavLink to="#">
//           <FontAwesomeIcon icon={faCalendar} />
//           {!collapsed && "Bookings"}
//         </NavLink>

//         <NavLink to="#">
//           <FontAwesomeIcon icon={faMoneyBill} />
//           {!collapsed && "Payments"}
//         </NavLink>

//         <NavLink to="#">
//           <FontAwesomeIcon icon={faChartBar} />
//           {!collapsed && "Reports"}
//         </NavLink>
//       </nav>

//       <button className="logout-btn" onClick={logout}>
//         <FontAwesomeIcon icon={faSignOutAlt} />
//         {!collapsed && "Logout"}
//       </button>
//     </div>
//   );
// }

// export default Sidebar;
// import { NavLink, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUserPlus,
//   faUsers,
//   faCalendar,
//   faMoneyBill,
//   faChartBar,
//   faSignOutAlt,
//   faBars
// } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import "../styles/admin.css";

// function AdminSidebar() {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/");
//   };

//   return (
//     <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
//       {/* Header */}
//       <div className="sidebar-header">
//         {!collapsed && <span className="logo">Gym Master</span>}
//         <button
//           className="collapse-btn"
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           <FontAwesomeIcon icon={faBars} />
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="sidebar-nav">
//         <NavLink
//           to="/admin"
//           className={({ isActive }) =>
//             isActive ? "nav-link active" : "nav-link"
//           }
//         >
//           <FontAwesomeIcon icon={faHome} />
//           {!collapsed && <span>Home</span>}
//         </NavLink>

//         <NavLink to="/admin/add-member" className="nav-link">
//           <FontAwesomeIcon icon={faUserPlus} />
//           {!collapsed && <span>Add Member</span>}
//         </NavLink>

//         <NavLink to="/admin/members" className="nav-link">
//           <FontAwesomeIcon icon={faUsers} />
//           {!collapsed && <span>Members</span>}
//         </NavLink>

//         <NavLink to="/admin/bookings" className="nav-link">
//           <FontAwesomeIcon icon={faCalendar} />
//           {!collapsed && <span>Bookings</span>}
//         </NavLink>

//         <NavLink to="/admin/payments" className="nav-link">
//           <FontAwesomeIcon icon={faMoneyBill} />
//           {!collapsed && <span>Payments</span>}
//         </NavLink>

//         <NavLink to="/admin/reports" className="nav-link">
//           <FontAwesomeIcon icon={faChartBar} />
//           {!collapsed && <span>Reports</span>}
//         </NavLink>
//       </nav>

//       {/* Logout */}
//       <button className="logout-btn" onClick={logout}>
//         <FontAwesomeIcon icon={faSignOutAlt} />
//         {!collapsed && <span>Logout</span>}
//       </button>
//     </aside>
//   );
// }

// export default AdminSidebar;
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserPlus,
  faUsers,
  faCalendar,
  faMoneyBill,
  faChartBar,
  faSignOutAlt,
  faBars,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../styles/admin.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && <span className="logo">Gym Master</span>}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink to="/admin" className="nav-link">
          <FontAwesomeIcon icon={faHome} />
          {!collapsed && <span>Home</span>}
        </NavLink>

        <NavLink to="/admin/add-member" className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} />
          {!collapsed && <span>Add Member</span>}
        </NavLink>

        {/* 🔥 NEW: Pending Members */}
        <NavLink to="/admin/pending" className="nav-link">
          <FontAwesomeIcon icon={faClock} />
          {!collapsed && <span>Pending Members</span>}
        </NavLink>

        <NavLink to="/admin/members" className="nav-link">
          <FontAwesomeIcon icon={faUsers} />
          {!collapsed && <span>Members</span>}
        </NavLink>

        <NavLink to="/admin/bookings" className="nav-link">
          <FontAwesomeIcon icon={faCalendar} />
          {!collapsed && <span>Bookings</span>}
        </NavLink>

        <NavLink to="/admin/payments" className="nav-link">
          <FontAwesomeIcon icon={faMoneyBill} />
          {!collapsed && <span>Payments</span>}
        </NavLink>

        <NavLink to="/admin/reports" className="nav-link">
          <FontAwesomeIcon icon={faChartBar} />
          {!collapsed && <span>Reports</span>}
        </NavLink>

      </nav>

      {/* Logout */}
      <button className="logout-btn" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}

export default AdminSidebar;