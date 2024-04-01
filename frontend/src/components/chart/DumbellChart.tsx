import React from "react";
import ReactApexChart, { Props } from "react-apexcharts";

const series = [
  {
    data: [
      {
        x: "2008",
        y: [2800, 4500],
      },
      {
        x: "2009",
        y: [3200, 4100],
      },
      {
        x: "2010",
        y: [2950, 7800],
      },
      {
        x: "2011",
        y: [3000, 4600],
      },
      {
        x: "2012",
        y: [3500, 4100],
      },
      {
        x: "2013",
        y: [4500, 6500],
      },
      {
        x: "2014",
        y: [4100, 5600],
      },
    ],
  },
];
const options = {
  chart: {
    height: 350,
    type: "rangeBar",
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      isDumbbell: true,
      columnWidth: 3,
      dumbbellColors: [["#008FFB", "#00E396"]],
    },
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    position: "top",
    horizontalAlign: "left",
    customLegendItems: ["Product A", "Product B"],
  },
  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      gradientToColors: ["#00E396"],
      inverseColors: true,
      stops: [0, 100],
    },
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    tickPlacement: "on",
  },
};

interface IDumbellChart extends Props {}

const DumbellChart: React.FC<IDumbellChart> = ({
  height = 280,
  type = "rangeBar",
  ...props
}) => {
  return <ReactApexChart type={type} height={280} {...props} />;
};

export default DumbellChart;
