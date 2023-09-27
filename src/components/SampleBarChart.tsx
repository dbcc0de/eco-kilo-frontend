import React, { PureComponent } from "react";
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
  summerPeakRateCalc: string;
  winterPeakRateCalc: string;
  offPeakRateCalc: string;
  offPeakWinterRateCalc: string;
}

const SampleBarChart = ({
  summerPeakRateCalc,
  winterPeakRateCalc,
  offPeakRateCalc,
  offPeakWinterRateCalc,
}: Props) => {
  let data;

  if (offPeakWinterRateCalc) {
    data = [
      {
        name: "Off Peak Summer",
        cost: Number(offPeakRateCalc),
        fill: "#8884d8",
      },
      {
        name: "Peak Summer",
        cost: Number(summerPeakRateCalc),
        fill: "#E11845",
      },
      {
        name: "Off Peak Winter",
        cost: Number(offPeakWinterRateCalc),
        fill: "#ADD8E6",
      },
      {
        name: "Peak Winter",
        cost: Number(winterPeakRateCalc),
        fill: "#82ca8e",
      },
    ];
  } else {
    data = [
      {
        name: "Off Peak",
        cost: Number(offPeakRateCalc),
        fill: "#8884d8",
      },
      {
        name: "Peak Summer",
        cost: Number(summerPeakRateCalc),
        fill: "#E11845",
      },
      {
        name: "Peak Winter",
        cost: Number(winterPeakRateCalc),
        fill: "#82ca8e",
      },
    ];
  }

  return (
    <ResponsiveContainer width="95%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis hide axisLine={false} type="number" />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          orientation="right"
          type="category"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => value.toLocaleString()}
          mirror
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="cost" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SampleBarChart;
