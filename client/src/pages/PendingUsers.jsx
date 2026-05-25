import { useEffect, useState } from "react";
import {
  getPendingUsers,
  approveUser,
  rejectUser,
} from "../services/adminService";
import AdminLayout from "../components/AdminLayout";
import "../styles/PendingMembers.css";
import { FiMail, FiPhone, FiCheck, FiX, FiClock, FiAlertCircle } from "react-icons/fi";

function PendingMembers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getPendingUsers();
      setUsers(res.data || []);
    } catch (error) {
      console.error("Failed to load pending users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = async (id) => {
    const confirmApprove = window.confirm("Approve this registration request?");
    if (!confirmApprove) return;
    try {
      await approveUser(id);
      alert("Registration request approved successfully!");
      loadUsers();
    } catch (error) {
      console.error("Failed to approve request", error);
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm("Reject and remove this registration request?");
    if (!confirmReject) return;
    try {
      await rejectUser(id);
      alert("Registration request rejected.");
      loadUsers();
    } catch (error) {
      console.error("Failed to reject request", error);
    }
  };

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
      <div className="pending-page">
        {/* HEADER */}
        <div className="pending-header">
          <div>
            <span className="pending-badge">Gym Registrations</span>
            <h1>Pending Approvals</h1>
            <p>Verify register credentials and grant member accounts.</p>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="empty-box loading">
            <div className="spinner" />
            <h2>Loading pending athletes...</h2>
          </div>
        ) : users.length === 0 ? (
          /* EMPTY STATE */
          <div className="empty-box">
            <div className="empty-icon-wrapper"><FiAlertCircle /></div>
            <h2>No Pending Requests</h2>
            <p>All athlete registrations are reviewed and active.</p>
          </div>
        ) : (
          /* CARD LIST */
          <div className="pending-grid">
            {users.map((u) => (
              <div className="pending-card" key={u._id}>
                {/* AVATAR RING */}
                <div className="avatar-ring-outer">
                  <div className="member-avatar">
                    {getInitials(u.name)}
                  </div>
                </div>

                {/* INFO */}
                <h2>{u.name}</h2>
                
                <div className="pending-detail-row">
                  <FiMail className="detail-icon" />
                  <span className="email">{u.email}</span>
                </div>

                <div className="pending-detail-row" style={{ marginBottom: "25px" }}>
                  <FiPhone className="detail-icon" />
                  <span className="phone">{u.phone}</span>
                </div>

                {/* BUTTONS */}
                <div className="pending-actions">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(u._id)}
                  >
                    <FiCheck style={{ marginRight: "6px" }} /> Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => handleReject(u._id)}
                  >
                    <FiX style={{ marginRight: "6px" }} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default PendingMembers;