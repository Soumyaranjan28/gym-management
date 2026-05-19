import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProgressChart() {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#00cec9", "#3a3a3a"],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default ProgressChart;
