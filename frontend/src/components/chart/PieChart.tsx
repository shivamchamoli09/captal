import React from "react";
import ReactApexChart, { Props } from "react-apexcharts";
import { IPieChartData } from "./types.ts/chart.type";
import { ApexOptions } from "apexcharts";

interface IPieChart extends Props {
  data: Array<IPieChartData>;
  options?: ApexOptions;
}

const PieChart: React.FC<IPieChart> = ({ data, options, ...rest }) => {
  return (
    <ReactApexChart
      options={{
        labels: data?.map((e) => e?.name),
        ...options,
      }}
      series={data?.map((e) => e?.value)}
      type="pie"
      labels={{
        show: true,
        name: {
          show: true,
        },
      }}
      {...rest}
    />
  );
};

export default PieChart;
