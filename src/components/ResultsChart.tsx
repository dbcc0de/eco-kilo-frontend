import "./ResultsChart.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  peakCostCounter: number;
  offPeakCostCounter: number;
}

const ResultsChart = ({ peakCostCounter, offPeakCostCounter }: Props) => {
  const data = [
    {
      name: "Your Daily Costs",
      Off_Peak: offPeakCostCounter.toFixed(2),
      Peak: peakCostCounter.toFixed(2),
    },
    {
      name: "National Average",
      Off_Peak: 3.74,
      Peak: 0.93,
    },
  ];

  return (
    <div
      style={{
        width: "50%",
        height: "60%",
        border: "2px solid black",
        borderRadius: "12px",
        backgroundColor: "white",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Off_Peak" fill="#82ca9d" />
          <Bar dataKey="Peak" fill="#82ca8e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
