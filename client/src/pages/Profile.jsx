import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";
import MobileNavbar from "../components/MobileNavbar";
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiAward, 
  FiCalendar, 
  FiPhoneCall, 
  FiActivity, 
  FiShield, 
  FiInfo 
} from "react-icons/fi";

function Profile() {
  // ================= STATE MANAGEMENT =================
  const [member, setMember] = useState(null);
  const [height, setHeight] = useState(175); // Height in cm for BMI

  // Declare fetchProfile above useEffect to avoid lint hoisting errors
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://gym-backend-h2rw.onrender.com/api/member/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setMember(res.data.member);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);

  // ================= UTILITIES & HELPERS =================
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  if (!member) {
    return (
      <div className="loading-box">
        <div className="spinner" />
        <h2>Loading Profile Details...</h2>
      </div>
    );
  }

  // BMI Calculation variables
  const weightNum = member.weight ? parseFloat(member.weight) : 75;
  const heightM = height / 100;
  const bmi = weightNum / (heightM * heightM);
  
  let bmiCategory = "Normal";
  let bmiClass = "normal";
  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiClass = "underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = "Normal Weight";
    bmiClass = "normal";
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "Overweight";
    bmiClass = "overweight";
  } else {
    bmiCategory = "Obese";
    bmiClass = "obese";
  }

  // Map BMI scale to slider position (15-35 range)
  const markerLeft = Math.min(95, Math.max(5, ((bmi - 15) / 20) * 90 + 5));

  return (
    <div className="profile-page">
      <div className="profile-container">
        <MobileNavbar />

        <div className="profile-grid-layout">
          {/* ================= LEFT COLUMN ================= */}
          <div className="profile-left-column">
            {/* Profile Avatar Card */}
            <div className="profile-top-card">
              <div className="avatar-outer-ring">
                <div className="profile-image-container">
                  {member.photo && member.photo.startsWith("http") ? (
                    <img
                      src={member.photo}
                      alt="profile"
                      className="profile-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback = e.target.parentElement.querySelector(".profile-initials-fallback");
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div 
                    className="profile-initials-fallback"
                    style={{ display: (!member.photo || !member.photo.startsWith("http")) ? "flex" : "none" }}
                  >
                    {getInitials(member.name)}
                  </div>
                </div>
              </div>

              <h1>{member.name}</h1>
              <span className={`membership-tier-badge ${member.membership?.toLowerCase() === "yearly" ? "yearly" : ""}`}>
                {member.membership} Member
              </span>
            </div>

            {/* BMI Estimator Widget */}
            <div className="profile-section-card bmi-calculator">
              <h2>
                <FiActivity className="section-icon" /> Body Mass Index (BMI)
              </h2>
              
              <div className="bmi-input-group">
                <div className="bmi-input-header">
                  <span>Height</span>
                  <span>{height} cm</span>
                </div>
                <input 
                  type="range" 
                  min="130" 
                  max="220" 
                  value={height} 
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="bmi-slider" 
                />
              </div>

              <div className="bmi-input-group">
                <div className="bmi-input-header">
                  <span>Current Weight</span>
                  <span>{weightNum} kg</span>
                </div>
              </div>

              <div className="bmi-result-panel">
                <div className="bmi-score">{bmi.toFixed(1)}</div>
                <span className={`bmi-badge ${bmiClass}`}>{bmiCategory}</span>
                
                <div className="bmi-scale-bar">
                  <div className="bmi-marker" style={{ left: `${markerLeft}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="profile-right-column">
            {/* Personal Details Card */}
            <div className="profile-section-card">
              <h2>
                <FiUser className="section-icon" /> Personal Details
              </h2>
              
              <div className="details-subgrid">
                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiUser /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Full Name</span>
                    <span className="item-value">{member.name}</span>
                  </div>
                </div>

                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiMail /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Email Address</span>
                    <span className="item-value">{member.email}</span>
                  </div>
                </div>

                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiPhone /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Phone Number</span>
                    <span className="item-value">{member.phone}</span>
                  </div>
                </div>

                <div className="detail-item-box full-width">
                  <div className="item-icon-wrapper"><FiMapPin /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Residential Address</span>
                    <span className="item-value">{member.address || "Not Provided"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership & Fitness Stats Card */}
            <div className="profile-section-card">
              <h2>
                <FiShield className="section-icon" /> Membership & Fitness
              </h2>
              
              <div className="details-subgrid">
                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiAward /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Plan Tier</span>
                    <span className="item-value">{member.membership}</span>
                  </div>
                </div>

                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiInfo /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Member Age</span>
                    <span className="item-value">{member.age || "N/A"} years</span>
                  </div>
                </div>

                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiActivity /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Logged Weight</span>
                    <span className="item-value">{member.weight || "N/A"} kg</span>
                  </div>
                </div>

                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiCalendar /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Admission Date</span>
                    <span className="item-value">
                      {member.admissionDate
                        ? new Date(member.admissionDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="detail-item-box">
                  <div className="item-icon-wrapper"><FiCalendar /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Renewal Date</span>
                    <span className="item-value">
                      {member.dueDate
                        ? new Date(member.dueDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="detail-item-box full-width">
                  <div className="item-icon-wrapper"><FiPhoneCall /></div>
                  <div className="item-content-wrapper">
                    <span className="item-label">Emergency Contact</span>
                    <span className="item-value">{member.emergencyContact || "Not Provided"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
