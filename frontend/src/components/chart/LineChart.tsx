// import * as React from "react";
// import { LineChart as L, LineChartProps } from '@mui/x-charts/LineChart';

// interface ILineChart extends LineChartProps {}

// const LineChart: React.FC<ILineChart> = (props) => {
//   return <L width={500} height={300} {...props} />;
// };

// export { LineChart };

import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export function LineChart() {
  return (
    <PieChart
      // height={200}
      series={[
        {
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          // cx: 150,
          // cy: 150,
        },
      ]}
    />
    // <PieChart
    //   series={[
    //     {
    //       data: [
    //         { id: 0, value: 10, label: "series A" },
    //         { id: 1, value: 15, label: "series B" },
    //         { id: 2, value: 20, label: "series C" },
    //       ],
    //     },
    //   ]}
    //   width={400}
    //   height={200}
    // />
  );
}
