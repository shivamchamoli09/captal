import * as React from "react";
import { LineChart as L, LineChartProps } from '@mui/x-charts/LineChart';


interface ILineChart extends LineChartProps {}

const LineChart: React.FC<ILineChart> = (props) => {
  return <L width={500} height={300} {...props} />;
};

export { LineChart };
