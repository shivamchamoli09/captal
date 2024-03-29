import React from "react";
import { PieChart } from "@/components/chart/PieChart";
import { useMipStore } from "@/store";
import { useMipChart } from "@/hooks/use-mip-charts";
import { Box, CircularProgress, Stack, useTheme } from "@mui/material";
import { BarChart } from "@/components/chart/BarChart";

const BarChartLayout: React.FC = () => {
  const { mipList, mipCurrentBalanceById } = useMipStore();
  const theme = useTheme();
  const { barChartData, barChartDiffData } = useMipChart({
    mips: mipList,
    currentPrices: mipCurrentBalanceById,
  });

  const titleTextStyles = {
    italic: false,
    fontSize: 14,
    color: theme.palette.text.primary,
  };

  return (
    <BarChart
      data={barChartData}
      chartType="ComboChart"
      //   diffdata={barChartDiffData}
      loader={<CircularProgress />}
      options={{
        title: "Mip Investment Comparision",
        titleTextStyle: { color: theme.palette.text.primary, fontSize: 14 },
        vAxis: {
          title: "ROI",
          minValue: 0,
          titleTextStyle: titleTextStyles,
          textStyle: { color: theme.palette.text.primary },
        },
        hAxis: {
          title: "Mips",
          titleTextStyle: titleTextStyles,
          textStyle: { color: theme.palette.text.primary },
        },
        seriesType: "bars",
        series: { 5: { type: "line" } },
        backgroundColor: "none",
        colors: ["#008ffb", "#00e396"],
        legend: {
          //   position: "top",
          textStyle: { fontSize: 11, color: theme.palette.text.primary },
        },
      }}
    />
  );
};

export { BarChartLayout };
