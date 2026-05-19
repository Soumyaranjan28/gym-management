import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ActivityChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Workout Activity",
        data: [30, 45, 28, 60, 80, 55, 40],
        backgroundColor: "#00cec9",
        borderRadius: 8,
        barThickness: 40
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#ccc" },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ActivityChart;
