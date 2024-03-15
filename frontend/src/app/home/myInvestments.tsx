import BarChart from "@/components/chart/BarChart";
import React from "react";
import { BarChartData, LineChartData } from "./lib/data";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { LineChart } from "@/components/chart/LineChart";
import { Card } from "@/components/base/Card";
import { Balance } from "./balance";
import { TopBadPerformer } from "./performers";
interface ITopCurrencies {}

const valueFormatter = (value: number) => `${value}mm`;

const MyInvestments: React.FC<ITopCurrencies> = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={3}
        display={"flex"}
        flexDirection={"column"}
        sx={{ justifyContent: "space-between" }}
        gap={2}
      >
        <Balance />

        <TopBadPerformer />
      </Grid>

      <Grid item xs={12} md={9}>
        <Card>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item md={6} xs={12}>
              <LineChart
                series={[
                  { data: LineChartData.pData, label: "pv", type: "line" },
                  { data: LineChartData.uData, label: "uv", type: "line" },
                ]}
                xAxis={[{ scaleType: "point", data: LineChartData.xLabels }]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <BarChart
                dataset={BarChartData}
                series={[
                  { dataKey: "BTC", label: "Bitcoin", valueFormatter },
                  { dataKey: "ETH", label: "Ethereum", valueFormatter },
                  { dataKey: "NYSE", label: "Apple", valueFormatter },
                  { dataKey: "NSE", label: "Reliance", valueFormatter },
                ]}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export { MyInvestments };
