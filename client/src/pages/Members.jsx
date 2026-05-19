
import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";

import "../styles/Members.css";

function Members() {
  const [members, setMembers] = useState([]);

  const [selectedMember, setSelectedMember] = useState(null);

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://gym-backend-h2rw.onrender.com/api/admin/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setMembers(data);
    } catch (error) {
      console.log(error);
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

      await fetch(`https://gym-backend-h2rw.onrender.com/api/admin/members/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        },
      );

      const updatedUser = await response.json();

      console.log(updatedUser);

      // FORCE IMAGE REFRESH
      // updatedUser.photo = updatedUser.photo + "?t=" + new Date().getTime();

      // UPDATE SELECTED MEMBER
      setSelectedMember({
        ...selectedMember,
        photo: updatedUser.photo,
      });

      // UPDATE MEMBERS LIST
      setMembers((prev) =>
        prev.map((member) =>
          member._id === updatedUser._id
            ? {
                ...member,
                photo: updatedUser.photo,
              }
            : member,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="members-page">
        {/* HEADER */}
        <div className="members-header">
          <h1>Gym Members</h1>

          <p>Manage all gym members</p>
        </div>

        {/* MEMBERS GRID */}
        <div className="members-grid">
          {members.map((member) => (
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
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    member.name?.charAt(0)?.toUpperCase()
                  )}
                </div>

                <div className="member-basic">
                  <h2>{member.name}</h2>

                  <p>{member.email}</p>
                </div>
              </div>

              {/* MEMBERSHIP */}
              <div className="membership-badge">{member.membership}</div>

              {/* ACTIONS */}
              <div className="member-actions">
                <button
                  className="view-btn"
                  onClick={() => setSelectedMember(member)}
                >
                  👁 View
                </button>

                <button
                  className="edit-btn"
                  onClick={() => alert("Edit feature coming soon")}
                >
                  ✏ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => removeMember(member._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedMember && (
          <div className="member-modal">
            <div className="member-modal-card">
              {/* HEADER */}
              <div className="modal-header">
                <div>
                  <h2>👤 Member Details</h2>

                  <p>{selectedMember.name}</p>
                </div>

                <button
                  className="close-btn"
                  onClick={() => setSelectedMember(null)}
                >
                  ✖
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
                        style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "20px",
                          objectFit: "cover",
                          border: "4px solid #8b5cf6",
                        }}
                      />
                    ) : (
                      <div className="profile-avatar">
                        {selectedMember.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* UPLOAD BUTTON */}
                  <div className="photo-upload">
                    <label htmlFor="photo">📸 Upload Photo</label>

                    <input
                      type="file"
                      id="photo"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* DETAILS */}
                <div className="details-grid">
                  <div className="detail-box">
                    <span>Full Name</span>

                    <h4>{selectedMember.name}</h4>
                  </div>

                  <div className="detail-box">
                    <span>Email</span>

                    <h4>{selectedMember.email}</h4>
                  </div>

                  <div className="detail-box">
                    <span>Phone</span>

                    <h4>{selectedMember.phone}</h4>
                  </div>

                  <div className="detail-box">
                    <span>Membership</span>

                    <h4>{selectedMember.membership}</h4>
                  </div>

                  <div className="detail-box">
                    <span>Age</span>

                    <h4>{selectedMember.age || "N/A"}</h4>
                  </div>

                  <div className="detail-box">
                    <span>Weight</span>

                    <h4>{selectedMember.weight || "N/A"} kg</h4>
                  </div>

                  <div className="detail-box">
                    <span>Admission Date</span>

                    <h4>
                      {selectedMember.admissionDate
                        ? new Date(
                            selectedMember.admissionDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </h4>
                  </div>

                  <div className="detail-box">
                    <span>Due Date</span>

                    <h4>
                      {selectedMember.dueDate
                        ? new Date(selectedMember.dueDate).toLocaleDateString()
                        : "N/A"}
                    </h4>
                  </div>

                  <div className="detail-box full-width">
                    <span>Address</span>

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

                <button className="footer-edit">✏ Edit Member</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Members;
