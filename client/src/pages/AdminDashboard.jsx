import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats, getAllAttendance } from "../services/adminService";
import AdminLayout from "../components/AdminLayout";
import "../styles/admin.css";
import { 
  FiUsers, 
  FiUserCheck, 
  FiUserPlus, 
  FiAlertCircle, 
  FiSearch, 
  FiCalendar, 
  FiActivity, 
  FiArrowRight,
  FiDollarSign 
} from "react-icons/fi";

function AdminDashboard() {
  const navigate = useNavigate();

  // ================= STATE MANAGEMENT =================
  const [stats, setStats] = useState({
    totalMembers: 0,
    expiringMembers: 0,
    newMembers: 0,
    pendingMembers: 0,
    totalRevenue: 0,
  });

  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [dates, setDates] = useState({ today: "", yesterday: "" });

  // ================= DATA FETCHING =================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Pre-compute dates
        setDates({
          today: new Date().toLocaleDateString(),
          yesterday: new Date(Date.now() - 86400000).toLocaleDateString()
        });

        // Fetch Stats
        const statsRes = await getDashboardStats();
        setStats({
          totalMembers: statsRes.data.totalMembers || 0,
          expiringMembers: statsRes.data.expiringMembers || 0,
          newMembers: statsRes.data.newMembers || 0,
          pendingMembers: statsRes.data.pendingMembers || 0,
          totalRevenue: statsRes.data.totalRevenue || 0,
        });

        // Fetch Attendance
        const attendanceRes = await getAllAttendance();
        if (attendanceRes.data && attendanceRes.data.success) {
          setAttendanceLogs(attendanceRes.data.attendance || []);
        }
      } catch (error) {
        console.error("Failed to load admin dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  // ================= LIVE CLIENT-SIDE FILTERING =================
  const filteredAttendance = (() => {
    let logs = [...attendanceLogs];

    // 1. Text Search Filter (Name / Email)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      logs = logs.filter(
        (log) => 
          (log.name && log.name.toLowerCase().includes(term)) ||
          (log.email && log.email.toLowerCase().includes(term))
      );
    }

    // 2. Date Dropdown Filter
    if (dateFilter !== "all") {
      if (dateFilter === "today") {
        logs = logs.filter((log) => log.date === dates.today);
      } else if (dateFilter === "yesterday") {
        logs = logs.filter((log) => log.date === dates.yesterday);
      }
    }

    return logs;
  })();

  // ================= UTILITIES =================
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="dashboard-page">
        {/* ================= HERO SECTION ================= */}
        <div className="hero-card">
          <div className="hero-content">
            <span className="hero-badge">Gym Management Portal</span>
            <h2>
              Manage Your Gym <span>Smarter</span>
            </h2>
            <p>
              Access member demographics, verify subscription lifespans, 
              approve pending accounts, and monitor check-in sessions.
            </p>
          </div>
          <div className="hero-circle"></div>
        </div>

        {/* ================= STATS WIDGETS ================= */}
        <div className="stats-grid">
          {/* Total Members */}
          <div className="stat-card">
            <div className="stat-header-row">
              <h3>Total Members</h3>
              <div className="stat-icon-box"><FiUsers /></div>
            </div>
            <h1>{stats.totalMembers}</h1>
          </div>

          {/* New Members */}
          <div className="stat-card">
            <div className="stat-header-row">
              <h3>New Members</h3>
              <div className="stat-icon-box"><FiUserCheck /></div>
            </div>
            <h1>{stats.newMembers}</h1>
          </div>

          {/* Pending Approvals */}
          <div className="stat-card">
            <div className="stat-header-row">
              <h3>Pending Members</h3>
              <div className="stat-icon-box"><FiUserPlus /></div>
            </div>
            <h1>{stats.pendingMembers}</h1>
          </div>

          {/* Expiring Soon */}
          <div className="stat-card">
            <div className="stat-header-row">
              <h3>Expiring Soon</h3>
              <div className="stat-icon-box"><FiAlertCircle /></div>
            </div>
            <h1>{stats.expiringMembers}</h1>
          </div>

          {/* Total Revenue */}
          <div className="stat-card">
            <div className="stat-header-row">
              <h3>Total Revenue</h3>
              <div className="stat-icon-box"><FiDollarSign /></div>
            </div>
            <h1>₹{stats.totalRevenue.toLocaleString("en-IN")}</h1>
          </div>
        </div>

        {/* ================= QUICK ACTION MODULES ================= */}
        <div className="quick-actions-section">
          <div className="quick-actions-grid">
            <div className="action-card" onClick={() => navigate("/admin/add-member")}>
              <div className="action-icon-wrapper"><FiUserPlus /></div>
              <div className="action-info">
                <h2>Add Member</h2>
                <p>Register new gym athletes manually.</p>
              </div>
              <FiArrowRight style={{ marginLeft: "auto", color: "#00d9ff" }} />
            </div>

            <div className="action-card" onClick={() => navigate("/admin/pending")}>
              <div className="action-icon-wrapper"><FiActivity /></div>
              <div className="action-info">
                <h2>Pending Requests</h2>
                <p>Verify register credentials and approvals.</p>
              </div>
              <FiArrowRight style={{ marginLeft: "auto", color: "#a855f7" }} />
            </div>

            <div className="action-card" onClick={() => navigate("/admin/members")}>
              <div className="action-icon-wrapper"><FiUsers /></div>
              <div className="action-info">
                <h2>Manage Members</h2>
                <p>Browse listings or remove active accounts.</p>
              </div>
              <FiArrowRight style={{ marginLeft: "auto", color: "#10b981" }} />
            </div>
          </div>
        </div>

        {/* ================= LIVE ATTENDANCE LOG TABLE ================= */}
        <div className="attendance-log-card">
          <div className="attendance-card-header">
            <div className="attendance-title-wrapper">
              <h2>
                <FiCalendar className="section-icon" /> Live Attendance Logs
              </h2>
              <p>Tracking active gym check-in logs in real-time</p>
            </div>

            {/* Filters Row */}
            <div className="attendance-search-row">
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="attendance-search-input"
                />
                <FiSearch style={{ position: "absolute", right: "12px", top: "13px", color: "var(--text-muted)" }} />
              </div>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="attendance-filter-select"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="attendance-table-container">
            {filteredAttendance.length > 0 ? (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Email Address</th>
                    <th>Date</th>
                    <th>Time Checked In</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((log, idx) => (
                    <tr key={log._id || idx}>
                      <td>
                        <div className="attendance-user-cell">
                          <div className="initials-avatar">{getInitials(log.name)}</div>
                          <span style={{ fontWeight: 600 }}>{log.name || "Unknown"}</span>
                        </div>
                      </td>
                      <td style={{ color: "#9ca3af" }}>{log.email || "N/A"}</td>
                      <td>{log.date}</td>
                      <td style={{ fontWeight: 500 }}>{log.checkInTime || "N/A"}</td>
                      <td>
                        <span className="status-badge checked-in">Checked In</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-attendance-records">
                No check-in logs match your current search queries.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;