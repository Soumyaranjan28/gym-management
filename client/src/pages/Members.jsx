import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "../styles/Members.css";
import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
  FiCamera,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiActivity,
  FiAlertCircle,
} from "react-icons/fi";

function Members() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://gym-backend-h2rw.onrender.com/api/admin/members",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // REMOVE MEMBER
  const removeMember = async (id) => {
    const confirmDelete = window.confirm("Remove this member?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `https://gym-backend-h2rw.onrender.com/api/admin/members/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  // IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://gym-backend-h2rw.onrender.com/api/admin/upload-photo/${selectedMember._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const updatedUser = await response.json();
      setSelectedMember({
        ...selectedMember,
        photo: updatedUser.photo,
      });
      setMembers((prev) =>
        prev.map((member) =>
          member._id === updatedUser._id
            ? { ...member, photo: updatedUser.photo }
            : member
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // UTILITIES
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getMembershipColor = (plan) => {
    if (!plan) return { bg: "rgba(156,163,175,0.15)", color: "#9ca3af" };
    const p = plan.toLowerCase();
    if (p.includes("year")) return { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" };
    if (p.includes("quarter")) return { bg: "rgba(168,85,247,0.15)", color: "#a855f7" };
    return { bg: "rgba(0,217,255,0.15)", color: "#00d9ff" };
  };

  // CLIENT SIDE SEARCH FILTER
  const filteredMembers = members.filter((m) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (m.name && m.name.toLowerCase().includes(term)) ||
      (m.email && m.email.toLowerCase().includes(term)) ||
      (m.phone && m.phone.toLowerCase().includes(term))
    );
  });

  return (
    <AdminLayout>
      <div className="members-page">
        {/* HEADER */}
        <div className="members-header">
          <div>
            <span className="members-badge">Member Directory</span>
            <h1>Gym Members</h1>
            <p>Browse, search, and manage all registered gym athletes.</p>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="members-search-wrapper">
          <div className="members-search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="members-count">
            <FiActivity style={{ marginRight: "6px" }} />
            {filteredMembers.length} member{filteredMembers.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="members-empty-box loading">
            <div className="spinner" />
            <h2>Loading members...</h2>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="members-empty-box">
            <div className="empty-icon-wrapper"><FiAlertCircle /></div>
            <h2>No Members Found</h2>
            <p>
              {searchTerm
                ? "No members match your search query."
                : "There are no registered members yet."}
            </p>
          </div>
        ) : (
          /* MEMBERS GRID */
          <div className="members-grid">
            {filteredMembers.map((member) => {
              const planStyle = getMembershipColor(member.membership);
              return (
                <div className="member-card" key={member._id}>
                  {/* TOP */}
                  <div className="member-top">
                    <div className="member-avatar">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt="profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "16px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        getInitials(member.name)
                      )}
                    </div>
                    <div className="member-basic">
                      <h2>{member.name}</h2>
                      <p><FiMail style={{ marginRight: "5px", fontSize: "12px" }} />{member.email}</p>
                    </div>
                  </div>

                  {/* MEMBERSHIP BADGE */}
                  <div
                    className="membership-badge"
                    style={{ background: planStyle.bg, color: planStyle.color }}
                  >
                    <FiAward style={{ marginRight: "6px" }} />
                    {member.membership || "No Plan"}
                  </div>

                  {/* ACTIONS */}
                  <div className="member-actions">
                    <button
                      className="view-btn"
                      onClick={() => setSelectedMember(member)}
                    >
                      <FiEye style={{ marginRight: "5px" }} /> View
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => alert("Edit feature coming soon")}
                    >
                      <FiEdit2 style={{ marginRight: "5px" }} /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => removeMember(member._id)}
                    >
                      <FiTrash2 style={{ marginRight: "5px" }} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL */}
        {selectedMember && (
          <div className="member-modal" onClick={() => setSelectedMember(null)}>
            <div className="member-modal-card" onClick={(e) => e.stopPropagation()}>
              {/* HEADER */}
              <div className="modal-header">
                <div>
                  <h2><FiUser style={{ marginRight: "10px" }} />Member Details</h2>
                  <p>{selectedMember.name}</p>
                </div>
                <button
                  className="close-btn"
                  onClick={() => setSelectedMember(null)}
                >
                  <FiX />
                </button>
              </div>

              {/* BODY */}
              <div className="modal-body">
                {/* PROFILE */}
                <div className="profile-section">
                  <div className="profile-avatar-container">
                    {selectedMember?.photo ? (
                      <img
                        src={selectedMember.photo}
                        alt="profile"
                        key={selectedMember.photo}
                        className="profile-image"
                      />
                    ) : (
                      <div className="profile-avatar">
                        {getInitials(selectedMember.name)}
                      </div>
                    )}
                  </div>

                  {/* UPLOAD BUTTON */}
                  <div className="photo-upload">
                    <label htmlFor="photo">
                      <FiCamera style={{ marginRight: "8px" }} /> Upload Photo
                    </label>
                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* DETAILS GRID */}
                <div className="details-grid">
                  <div className="detail-box">
                    <span><FiUser className="detail-icon" /> Full Name</span>
                    <h4>{selectedMember.name}</h4>
                  </div>

                  <div className="detail-box">
                    <span><FiMail className="detail-icon" /> Email</span>
                    <h4>{selectedMember.email}</h4>
                  </div>

                  <div className="detail-box">
                    <span><FiPhone className="detail-icon" /> Phone</span>
                    <h4>{selectedMember.phone}</h4>
                  </div>

                  <div className="detail-box">
                    <span><FiAward className="detail-icon" /> Membership</span>
                    <h4>{selectedMember.membership}</h4>
                  </div>

                  <div className="detail-box">
                    <span><FiActivity className="detail-icon" /> Age</span>
                    <h4>{selectedMember.age || "N/A"}</h4>
                  </div>

                  <div className="detail-box">
                    <span><FiActivity className="detail-icon" /> Weight</span>
                    <h4>{selectedMember.weight || "N/A"} kg</h4>
                  </div>

                  <div className="detail-box">
                    <span><FiCalendar className="detail-icon" /> Admission Date</span>
                    <h4>
                      {selectedMember.admissionDate
                        ? new Date(selectedMember.admissionDate).toLocaleDateString()
                        : "N/A"}
                    </h4>
                  </div>

                  <div className="detail-box">
                    <span><FiCalendar className="detail-icon" /> Due Date</span>
                    <h4>
                      {selectedMember.dueDate
                        ? new Date(selectedMember.dueDate).toLocaleDateString()
                        : "N/A"}
                    </h4>
                  </div>

                  <div className="detail-box full-width">
                    <span><FiMapPin className="detail-icon" /> Address</span>
                    <h4>{selectedMember.address || "N/A"}</h4>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer">
                <button
                  className="footer-close"
                  onClick={() => setSelectedMember(null)}
                >
                  Close
                </button>
                <button className="footer-edit">
                  <FiEdit2 style={{ marginRight: "6px" }} /> Edit Member
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Members;
