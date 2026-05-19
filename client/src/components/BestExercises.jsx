import { useState, useEffect } from "react";

const exercises = [
  { name: "Sumo Squat", duration: 100},
  { name: "Front Lunge", duration: 15 },
  { name: "Push Ups", duration: 10 }
];

export default function BestExercises() {
  const [active, setActive] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!active || time === 0) return;

    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, active]);

  const startExercise = (ex) => {
    setActive(ex);
    setTime(ex.duration);
  };

  const progress =
    active ? ((active.duration - time) / active.duration) * 100 : 0;

  return (
    <div className="card best-exercises">
      <h3>Best Exercises</h3>

      {/* ACTIVE EXERCISE */}
      {active && (
        <div className="exercise-active">
          <h2>{active.name}</h2>

          <div
            className="progress-ring"
            style={{ "--progress": `${progress}%` }}
          >
            <span>{time}s</span>
          </div>

          {time === 0 && (
            <button className="btn-done" onClick={() => setActive(null)}>
              ✔ Finished
            </button>
          )}
        </div>
      )}

      {/* LIST */}
      {!active &&
        exercises.map((ex, i) => (
          <div key={i} className="exercise-row">
            <div>
              <strong>{ex.name}</strong>
              <small>{ex.duration}s</small>
            </div>
            <button onClick={() => startExercise(ex)}>▶</button>
          </div>
        ))}
    </div>
  );
}
