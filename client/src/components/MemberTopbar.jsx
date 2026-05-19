import { useNavigate } from "react-router-dom";
import "../styles/member-topbar.css";

function MemberTopbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="member-topbar">
      <h2>🏋️ eFitness</h2>

      <div className="topbar-actions">
        <button onClick={() => navigate("/workouts")}>Workouts</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button className="logout" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default MemberTopbar;
