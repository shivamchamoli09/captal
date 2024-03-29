import React from "react";
import {
  Chart,
  ChartWrapperOptions,
  GoogleChartWrapperChartType,
  ReactGoogleChartProps,
} from "react-google-charts";

interface IBarChart extends Omit<ReactGoogleChartProps, "chartType"> {
  chartType?: GoogleChartWrapperChartType;
}

const BarChart: React.FC<IBarChart> = ({
  height = 320,
  chartType = "ComboChart",
  ...rest
}) => {
  return <Chart chartType={chartType} width="100%" height={height} {...rest} />;
};

export { BarChart };
