function ExerciseList() {
  const exercises = [
    { name: "Sumo Squat", time: "08:40 - 09:15" },
    { name: "Front Lunge", time: "09:20 - 09:45" },
    { name: "Push Ups", time: "10:00 - 10:20" }
  ];

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Best Exercises</h3>
        <button className="btn-small">All Exercises</button>
      </div>

      <ul className="exercise-list">
        {exercises.map((ex, index) => (
          <li key={index} className="exercise-item">
            <div>
              <strong>{ex.name}</strong>
              <p>{ex.time}</p>
            </div>
            <span>▶</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;
