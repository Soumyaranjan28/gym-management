import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";
import MobileNavbar from "../components/MobileNavbar";

function Profile() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://gym-backend-h2rw.onrender.com/api/member/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);
      

      // setMember(res.data);
      setMember(res.data.member);
      //   setMember(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (!member) {
    return (
      <div className="loading-box">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <MobileNavbar />
        {/* TOP */}
        <div className="profile-top">
          <div className="profile-image-wrapper">
            <img
              src={
                member.photo
                  ? member.photo
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              className="profile-image"
            />
          </div>

          <h1>{member.name}</h1>

          <p>{member.membership} Member</p>
        </div>

        {/* DETAILS */}
        <div className="details-grid">
          <div className="detail-card">
            <span>Full Name</span>
            <h3>{member.name}</h3>
          </div>

          <div className="detail-card">
            <span>Email</span>
            <h3>{member.email}</h3>
          </div>

          <div className="detail-card">
            <span>Phone</span>
            <h3>{member.phone}</h3>
          </div>

          <div className="detail-card">
            <span>Membership</span>
            <h3>{member.membership}</h3>
          </div>

          <div className="detail-card">
            <span>Age</span>
            <h3>{member.age || "N/A"}</h3>
          </div>

          <div className="detail-card">
            <span>Weight</span>
            <h3>{member.weight || "N/A"} kg</h3>
          </div>

          <div className="detail-card">
            <span>Joining Date</span>
            <h3>
              {member.admissionDate
                ? new Date(member.admissionDate).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>

          <div className="detail-card">
            <span>Expiry Date</span>
            <h3>
              {member.dueDate
                ? new Date(member.dueDate).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>

          <div className="detail-card full-width">
            <span>Address</span>
            <h3>{member.address || "N/A"}</h3>
          </div>

          <div className="detail-card full-width">
            <span>Emergency Contact</span>
            <h3>{member.emergencyContact || "N/A"}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
