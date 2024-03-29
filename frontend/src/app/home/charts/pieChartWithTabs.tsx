import React, { useMemo } from "react";
import { PieChart } from "@/components/chart/PieChart";
import { useMipStore } from "@/store";
import { useMipChart } from "@/hooks/use-mip-charts";
import { Box, CircularProgress, Stack, useTheme } from "@mui/material";
import { Tabs } from "@/components/base/Tabs";

const PieChartWithTabs: React.FC = () => {
  const [value, setValue] = React.useState<"Balance" | "Profit" | "Invested">(
    "Balance"
  );
  const { mipList, mipCurrentBalanceById } = useMipStore();
  const { pieChartData, pieChartProfitData, pieChartBalanceData } = useMipChart(
    { mips: mipList, currentPrices: mipCurrentBalanceById }
  );
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (value === "Balance") return pieChartBalanceData;
    if (value === "Profit") return pieChartProfitData;
    return pieChartData;
  }, [pieChartData, pieChartProfitData, pieChartBalanceData, value]);
  return (
    <Box>
      <Stack>
        <Tabs
          tabs={["Balance", "Profit", "Invested"]}
          value={value}
          onChange={(val) => setValue(val as typeof value)}
        />
      </Stack>

      <PieChart
        width={400}
        height={320}
        data={chartData}
        loader={<CircularProgress />}
        options={{
          tooltip: {
            y: {
              formatter: (val) => {
                return "$" + val;
              },
            },
          },
          legend: {
            labels: { colors: theme.palette.text.primary },
          },
        }}
      />
    </Box>
  );
};

export { PieChartWithTabs };
