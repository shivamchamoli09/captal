import React from "react";
import ReactApexChart, { Props } from "react-apexcharts";


interface IDumbellChart extends Props {}

const DumbellChart: React.FC<IDumbellChart> = ({
  height = 280,
  type = "rangeBar",
  ...props
}) => {
  return <ReactApexChart type={type} height={280} {...props} />;
};

export default DumbellChart;
