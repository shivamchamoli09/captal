"use client";

import React, { lazy, useState } from "react";
import { useMipStore } from "@/store";
import { useMipChart } from "@/hooks/use-mip-charts";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Fade,
  Stack,
  useTheme,
} from "@mui/material";
// import BarChart from "@/components/chart/BarChart";
import { Tabs } from "@/components/base/Tabs";
// import { DumbellChart } from "@/components/chart/DumbellChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
const BarChart = lazy(() => import("@/components/chart/BarChart"));
const DumbellChart = lazy(() => import("@/components/chart/DumbellChart"));

const BarChartLayout: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"bar" | "dumbell">("bar");
  const { mipList, mipCurrentBalanceById } = useMipStore();
  const theme = useTheme();
  const { barChartData, dumbellChartData } = useMipChart({
    mips: mipList,
    currentPrices: mipCurrentBalanceById,
  });

  const titleTextStyles = {
    italic: false,
    fontSize: 14,
    color: theme.palette.text.primary,
  };

  return (
    <Box>
      <ButtonGroup color="success" sx={{ width: "100%" }}>
        <Button
          id="bar"
          variant={selectedTab === "bar" ? "contained" : "outlined"}
          onClick={() => setSelectedTab("bar")}
          sx={{ ml: "auto" }}
        >
          <BarChartIcon />
        </Button>
        <Button
          id="dumbell"
          variant={selectedTab === "dumbell" ? "contained" : "outlined"}
          onClick={() => setSelectedTab("dumbell")}
        >
          <FitnessCenterIcon />
        </Button>
      </ButtonGroup>
      <Fade in={selectedTab === "bar"} timeout={700}>
        <div style={{ display: selectedTab === "bar" ? "block" : "none" }}>
          <BarChart
            data={barChartData}
            chartType="ComboChart"
            //   diffdata={barChartDiffData}
            loader={<CircularProgress />}
            options={{
              title: "Mip Investment Comparision",
              titleTextStyle: {
                color: theme.palette.text.primary,
                fontSize: 14,
              },
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
                textStyle: {
                  fontSize: 11,
                  color: theme.palette.text.primary,
                },
              },
            }}
          />
        </div>
      </Fade>

      <Fade in={selectedTab === "dumbell"} timeout={700}>
        <div style={{ display: selectedTab === "dumbell" ? "block" : "none" }}>
          <DumbellChart
            series={[{ data: dumbellChartData }]}
            animations={{ enabled: true, easing: "easeinout" }}
            options={{
              chart: {
                background: "inherit",
                toolbar: { show: false },
                height: 350,
                type: "rangeBar",
                zoom: {
                  enabled: false,
                },
              },
              plotOptions: {
                bar: {
                  isDumbbell: true,
                  columnWidth: 5,
                  dumbbellColors: [["#008FFB", "#00E396"]],
                },
              },
              legend: {
                show: false,
              },
              fill: {
                type: "gradient",
                gradient: {
                  type: "vertical",
                  gradientToColors: ["#FFF"],
                  // inverseColors: true,
                  // stops: [0, 100],
                },
              },
              theme: { mode: "dark" },
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
            }}
          />
        </div>
      </Fade>
    </Box>
  );
};

export { BarChartLayout };
