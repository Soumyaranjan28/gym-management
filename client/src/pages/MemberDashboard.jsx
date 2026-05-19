// import { useNavigate } from "react-router-dom";

// function MemberDashboard() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.header}>
//         <h1>Member Dashboard</h1>
//         <button onClick={logout} style={styles.logoutBtn}>
//           Logout
//         </button>
//       </div>

//       <p>Welcome to your gym dashboard 💪</p>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     background: "#111",
//     color: "#fff",
//     padding: "40px"
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   logoutBtn: {
//     background: "#e63946",
//     border: "none",
//     padding: "8px 16px",
//     color: "#fff",
//     borderRadius: "5px",
//     cursor: "pointer"
//   }
// };

// export default MemberDashboard;
import MemberTopbar from "../components/MemberTopbar";
import StatCard from "../components/StatCard";
import ActivityChart from "../components/ActivityChart";
import ProgressChart from "../components/ProgressChart";
import ExerciseList from "../components/ExerciseList";
import "../styles/member-dashboard.css";
import BestExercises from "../components/BestExercises";

function MemberDashboard() {
  return (
    <div className="member-page">
      <MemberTopbar />

      <div className="member-container">
        {/* STATS */}
        <div className="stats-grid">
          <StatCard title="Steps" value="3,500" />
          <StatCard title="Water" value="2.25 L" />
          <StatCard title="Calories" value="Today Under" />
          <StatCard title="Heart Rate" value="110 bpm" />
        </div>

        {/* CHARTS */}
        <div className="charts-grid">
          <div className="card">
            <h3>Weekly Activity</h3>
            <ActivityChart />
          </div>

          <div className="card">
            <h3>Progress</h3>
            <ProgressChart />
            
          </div>
        </div>

        {/* BOTTOM */}
        <div className="bottom-grid">
          
          <ExerciseList />

          <div className="card">
            <h3>Daily Tip</h3>
            <p>Stay hydrated and stretch before workouts 💪</p>
            <BestExercises />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
