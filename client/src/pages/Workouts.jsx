import { useState, useEffect } from "react";
import "../styles/workouts.css";
import MobileNavbar from "../components/MobileNavbar";
const workouts = [
  {
    name: "Push Ups",
    image: "/images/GYM10.webp",
    duration: 30,
    reps: "15 reps",
  },

  {
    name: "Squats",
    image: "/images/GYM8.avif",
    duration: 45,
    reps: "20 reps",
  },

  {
    name: "Plank",
    image: "/images/GYM7.avif",
    duration: 60,
    reps: "60 sec",
  },

  {
    name: "Burpees",
    image: "/images/GYM9.avif",
    duration: 40,
    reps: "12 reps",
  },
  {
    name: "Jumping Jacks",
    image: "/images/gym11.jpg",
    duration: 25,
    reps: "30 reps",
  },

  {
    name: "Mountain Climbers",
    image: "/images/gym12.png",
    duration: 40,
    reps: "20 reps",
  },

  {
    name: "Lunges",
    image: "/images/gym16.gif",
    duration: 35,
    reps: "15 reps",
  },

  {
    name: "Deadlift",
    image: "/images/hulk3.png",
    duration: 50,
    reps: "10 reps",
  },

  {
    name: "Bicep Curls",
    image: "/images/GYM7.avif",
    duration: 30,
    reps: "15 reps",
  },

  {
    name: "Bench Press",
    image: "/images/GYM8.avif",
    duration: 45,
    reps: "12 reps",
  },

  {
    name: "Cycling",
    image: "/images/GYM9.avif",
    duration: 60,
    reps: "5 mins",
  },

  {
    name: "Treadmill Run",
    image: "/images/GYM10.webp",
    duration: 90,
    reps: "10 mins",
  },

  {
    name: "Pull Ups",
    image: "/images/gym6.jpg",
    duration: 35,
    reps: "10 reps",
  },

  {
    name: "Yoga Stretch",
    image: "/images/gym1.png",
    duration: 120,
    reps: "2 mins",
  },
];

function Workouts() {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert("Workout Completed ✅");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startWorkout = (workout) => {
    setActiveWorkout(workout);
    setTimeLeft(workout.duration);
    setIsRunning(true);
  };

  const stopWorkout = () => {
    setIsRunning(false);
  };

  return (
    <div className="workout-page">
      <h1 className="workout-title">🔥 Daily Workouts</h1>
      <MobileNavbar />
      <div className="workout-grid">
        {workouts.map((workout, index) => (
          <div className="workout-card" key={index}>
            <img src={workout.image} alt={workout.name} />

            <div className="workout-content">
              <h2>{workout.name}</h2>

              <p>{workout.reps}</p>

              <span>{workout.duration} sec</span>

              {activeWorkout?.name === workout.name ? (
                <div className="timer-box">
                  <h3>{timeLeft}s</h3>

                  {isRunning ? (
                    <button className="end-btn" onClick={stopWorkout}>
                      End Workout
                    </button>
                  ) : (
                    <button
                      className="start-btn"
                      onClick={() => startWorkout(workout)}
                    >
                      Restart
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className="start-btn"
                  onClick={() => startWorkout(workout)}
                >
                  Start Workout
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
