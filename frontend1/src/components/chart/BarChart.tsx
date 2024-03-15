import * as React from "react";
import { BarChart as B, BarChartProps } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function BarChart(props: BarChartProps) {
  return (
    <B
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      {...chartSetting}
      {...props}
    />
  );
}

export { BarChart };
