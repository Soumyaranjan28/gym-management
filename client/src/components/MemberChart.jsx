import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function MemberChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "New Members",
        data: [1, 3, 0, 4, 2],
        borderColor: "#b30000",
        tension: 0.4
      }
    ]
  };

  return <Line data={data} />;
}

export default MemberChart;
