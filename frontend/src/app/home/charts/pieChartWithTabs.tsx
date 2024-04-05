"use client";

import React, { lazy, useMemo } from "react";
// import { PieChart } from "@/components/chart/PieChart";
import { useMipStore } from "@/store";
import { useMipChart } from "@/hooks/use-mip-charts";
import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  useTheme,
} from "@mui/material";
import { Tabs } from "@/components/base/Tabs";
const PieChart = lazy(() => import("@/components/chart/PieChart"));

const PieChartWithTabs: React.FC = () => {
  const [value, setValue] = React.useState<"Balance" | "Profit" | "Invested">(
    "Balance"
  );
  const { mipList, mipCurrentBalanceById, isLoading } = useMipStore();
  const { pieChartData, pieChartProfitData, pieChartBalanceData } = useMipChart(
    { mips: mipList, currentPrices: mipCurrentBalanceById }
  );
  const theme = useTheme();

  const chartData = useMemo(() => {
    if (value === "Balance") return pieChartBalanceData;
    if (value === "Profit") return pieChartProfitData;
    return pieChartData;
  }, [pieChartData, pieChartProfitData, pieChartBalanceData, value]);

  if (isLoading) {
    return (
      <Box
        p={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={2}>
          <Skeleton
            variant="rectangular"
            width={80}
            height={20}
            sx={{ borderRadius: "6px" }}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={20}
            sx={{ borderRadius: "6px" }}
          />
          <Skeleton
            variant="rectangular"
            width={80}
            height={20}
            sx={{ borderRadius: "6px" }}
          />
        </Stack>
        <Skeleton variant="circular" width={240} height={240} sx={{ mt: 4 }} />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // overflowX: "auto",
      }}
    >
      <Tabs
        tabs={["Balance", "Profit", "Invested"]}
        value={value}
        onChange={(val) => setValue(val as typeof value)}
      />

      <PieChart
        width={370}
        height={320}
        data={chartData}
        options={{
          colors: [
            "#191970",
            "#556B2F",
            "#008B8B",
            "#FF69B4",
            "#FFA500",
            "#800080",
            "#800020",
            "#228B22",
            "#000080",
            "#008080",
          ],
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
