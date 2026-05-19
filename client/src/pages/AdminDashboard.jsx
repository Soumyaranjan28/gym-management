// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/AdminSidebar";
// import Topbar from "../components/Topbar";
// import StatCard from "../components/StatCard";
// import MemberChart from "../components/MemberChart";
// import { getDashboardStats } from "../services/adminService";
// import "../styles/admin.css";
// import AdminLayout from "../components/AdminLayout";

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [stats, setStats] = useState({
//     totalMembers: 0,
//     expiringMembers: 0,
//     newMembers: 0,
//     visitorsToday: 0,
//     bookings: 0,
//     pendingMembers: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await getDashboardStats();

//         setStats({
//           totalMembers: res.data.totalMembers,
//           expiringMembers: res.data.expiringMembers,
//           newMembers: res.data.newMembers,
//           visitorsToday: res.data.visitorsToday,
//           bookings: res.data.bookings,
//           pendingMembers: res.data.pendingMembers,
//         });
//       } catch (error) {
//         console.error("Failed to load dashboard stats", error);
//       }
//     };

//     fetchStats();
//   }, []);
  

//   return (
//     <div className="admin-layout">
//       {/* SIDEBAR */}

//       <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
//         <div className="logo">Gym Master</div>

//         <ul>
//           <li onClick={() => navigate("/admin")}>🏠 Dashboard</li>

//           <li onClick={() => navigate("/admin/add-member")}>➕ Add Member</li>

//           <li onClick={() => navigate("/admin/pending")}>⏳ Pending Members</li>

//           <li onClick={() => navigate("/admin/members")}>👥 Members</li>

//           <li>💳 Payments</li>

//           <li>📊 Reports</li>

//           <li
//             className="logout-btn"
//             onClick={() => {
//               localStorage.clear();
//               navigate("/login");
//             }}
//           >
//             🚪 Logout
//           </li>
//         </ul>
//       </div>

//       {/* MAIN CONTENT */}

//       <div className="main-content">
//         {/* TOPBAR */}

//         <div className="topbar">
//           <div className="top-left">
//             <button
//               className="menu-btn"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               ☰
//             </button>

//             <div>
//               <h1>Admin Dashboard</h1>
//               <p>Welcome back, Admin 👋</p>
//             </div>
//           </div>

//           <div className="top-icons">
//             <button>🌙</button>
//             <button>🔔</button>
//             <button>👤</button>
//           </div>
//         </div>

//         {/* HERO */}

//         <div className="hero-card">
//           <div className="hero-content">
//             <span className="hero-badge">Gym Management System</span>

//             <h2>
//               Manage Your Gym
//               <span> Smarter</span>
//             </h2>

//             <p>Track members, subscriptions, payments and approvals easily.</p>
//           </div>
//         </div>

//         {/* STATS */}

//         <div className="stats-grid">
//           <div className="stat-card">
//             <h3>Total Members</h3>
//             <h1>{stats.totalMembers}</h1>
//           </div>

//           <div className="stat-card">
//             <h3>New Members</h3>
//             <h1>{stats.newMembers}</h1>
//           </div>

//           <div className="stat-card">
//             <h3>Pending</h3>
//             <h1>{stats.pendingMembers}</h1>
//           </div>

//           <div className="stat-card">
//             <h3>Expiring Soon</h3>
//             <h1>{stats.expiringMembers}</h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboardStats } from "../services/adminService";

import AdminLayout from "../components/AdminLayout";

import "../styles/admin.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalMembers: 0,
    expiringMembers: 0,
    newMembers: 0,
    pendingMembers: 0,
  });

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await getDashboardStats();

        setStats({
          totalMembers: res.data.totalMembers,
          expiringMembers: res.data.expiringMembers,
          newMembers: res.data.newMembers,
          pendingMembers: res.data.pendingMembers,
        });

      } catch (error) {

        console.log(error);
      }
    };

    fetchStats();

  }, []);

  return (

    <AdminLayout>

      <div className="dashboard-page">

        {/* HERO SECTION */}

        <div className="hero-card">

          <div className="hero-content">

            <span className="hero-badge">
              Gym Management System
            </span>

            <h2>
              Manage Your Gym
              <span> Smarter</span>
            </h2>

            <p>
              Track members, subscriptions,
              payments and approvals easily.
            </p>

          </div>

          <div className="hero-circle"></div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Members</h3>
            <h1>{stats.totalMembers}</h1>
          </div>

          <div className="stat-card">
            <h3>New Members</h3>
            <h1>{stats.newMembers}</h1>
          </div>

          <div className="stat-card">
            <h3>Pending Members</h3>
            <h1>{stats.pendingMembers}</h1>
          </div>

          <div className="stat-card">
            <h3>Expiring Soon</h3>
            <h1>{stats.expiringMembers}</h1>
          </div>

        </div>

        {/* QUICK ACTIONS

        <div className="action-grid">

          <div
            className="action-card"
            onClick={() =>
              navigate("/admin/add-member")
            }
          >
            <h2>Add Member</h2>

            <p>
              Create new gym members manually.
            </p>
          </div>

          <div
            className="action-card"
            onClick={() =>
              navigate("/admin/pending")
            }
          >
            <h2>Pending Requests</h2>

            <p>
              Approve or reject registrations.
            </p>
          </div>

          <div
            className="action-card"
            onClick={() =>
              navigate("/admin/members")
            }
          >
            <h2>Manage Members</h2>

            <p>
              View and remove gym members.
            </p>
          </div> */}

        

      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;