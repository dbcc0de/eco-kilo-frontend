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
  offPeakWinterRateCalc: number;
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
        rate: Number(offPeakRateCalc),
        fill: "#8884d8",
      },
      {
        name: "Peak Summer",
        rate: Number(summerPeakRateCalc),
        fill: "#E11845",
      },
      {
        name: "Peak Winter",
        rate: Number(winterPeakRateCalc),
        fill: "#82ca8e",
      },
      {
        name: "Off Peak Winter",
        rate: Number(offPeakWinterRateCalc),
        fill: "#82ca9d",
      },
    ];
  } else {
    data = [
      {
        name: "Off Peak Summer",
        rate: Number(offPeakRateCalc),
        fill: "#8884d8",
      },
      {
        name: "Peak Summer",
        rate: Number(summerPeakRateCalc),
        fill: "#E11845",
      },
      {
        name: "Peak Winter",
        rate: Number(winterPeakRateCalc),
        fill: "#82ca8e",
      },
    ];
  }

  return (
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
        // tick={YAxisLeftTick}
      />
      <YAxis
        orientation="right"
        type="category"
        axisLine={false}
        tickLine={false}
        tickFormatter={(value) => value.toLocaleString()}
        mirror
        // tick={{
        //   transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`,
        // }}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="rate" />
    </BarChart>
  );
};

export default SampleBarChart;
