import "../styles/member-dashboard.css";
import MobileNavbar from "../components/MobileNavbar";
import axios from "axios";
function MemberDashboard() {
  const markAttendance = async () => {
    console.log("Attendance button clicked");

    try {
      const token = localStorage.getItem("token");

      const userData = localStorage.getItem("user");

      if (!userData) {
        alert("User not found. Please login again.");
        return;
      }

      const user = JSON.parse(userData);

      console.log(user);

      const res = await axios.post(
        "http://localhost:5000/api/attendance/mark",
        {
          memberId: user._id,
          name: user.name,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);

      alert("Attendance failed");
    }
  };
  const todayWorkout = [
    {
      day: "Monday",
      title: "Chest & Triceps",
      exercises: ["Bench Press", "Push Ups", "Chest Fly", "Tricep Dips"],
      image: "/images/chest.jpg",
    },

    {
      day: "Tuesday",
      title: "Cardio Day",
      exercises: ["Running", "Cycling", "Jump Rope", "Burpees"],
      image: "/images/cardio.jpg",
    },

    {
      day: "Wednesday",
      title: "Back & Biceps",
      exercises: ["Pull Ups", "Deadlift", "Barbell Row", "Bicep Curl"],
      image: "/images/back.jpg",
    },

    {
      day: "Thursday",
      title: "Rest Day 😴",
      exercises: ["Recovery", "Stretching", "Meditation"],
      image: "/images/rest.jpg",
    },

    {
      day: "Friday",
      title: "Leg Day",
      exercises: ["Squats", "Lunges", "Leg Press", "Calf Raises"],
      image: "/images/legs.jpg",
    },

    {
      day: "Saturday",
      title: "Shoulders",
      exercises: ["Shoulder Press", "Lateral Raise", "Front Raise"],
      image: "/images/shoulder.jpg",
    },

    {
      day: "Sunday",
      title: "Full Body",
      exercises: ["Push Ups", "Pull Ups", "Squats", "Plank"],
      image: "/images/fullbody.jpg",
    },
  ];

  return (
    <div className="member-dashboard">
      {/* ================= NAVBAR ================= */}

      <MobileNavbar />

      {/* ================= HERO ================= */}

      <div className="hero-card">
        <div>
          <h1>Welcome Back 🔥</h1>

          <p>Train hard, stay strong, stay healthy.</p>
        </div>

        <div className="hero-buttons">
          <button className="start-btn">Start Workout</button>

          <button className="attendance-btn" onClick={markAttendance}>
            Mark Attendance
          </button>
        </div>
      </div>
      {/* ================= STATS ================= */}

      <div className="stats-container">
        <div className="stat-box">
          <h3>Calories</h3>
          <h1>1240</h1>
          <p>Today's Burn</p>
        </div>

        <div className="stat-box">
          <h3>Water</h3>
          <h1>2.5L</h1>
          <p>Daily Intake</p>
        </div>

        <div className="stat-box">
          <h3>Heart Rate</h3>
          <h1>110 bpm</h1>
          <p>Normal</p>
        </div>

        <div className="stat-box">
          <h3>Workout Streak</h3>
          <h1>12 Days</h1>
          <p>Keep Going 🔥</p>
        </div>
      </div>

      {/* ================= WEEKLY PLAN ================= */}

      <div className="section-title">
        <h2>Weekly Workout Plan</h2>
      </div>

      <div className="workout-grid">
        {todayWorkout.map((workout, index) => (
          <div className="workout-card" key={index}>
            <img src={workout.image} alt={workout.title} />

            <div className="workout-content">
              <span className="workout-day">{workout.day}</span>

              <h3>{workout.title}</h3>

              <ul>
                {workout.exercises.map((exercise, i) => (
                  <li key={i}>{exercise}</li>
                ))}
              </ul>

              <button>Start Training</button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MEMBERSHIP ================= */}

      <div className="membership-card">
        <div>
          <h2>Premium Membership</h2>

          <p>Valid Till: 20 Aug 2026</p>
        </div>

        <button>Renew</button>
      </div>
    </div>
  );
}

export default MemberDashboard;
