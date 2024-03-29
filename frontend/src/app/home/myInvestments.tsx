import React from "react";
import { BarChartData, LineChartData } from "./lib/data";
import { Box, Grid, Stack } from "@mui/material";
import { Card } from "@/components/base/Card";
import { Balance } from "./balance";
import { TopBadPerformer } from "./performers";
import { PieChartWithTabs } from "./charts/pieChartWithTabs";
import { BarChartLayout } from "./charts/barChartLayout";
import { DumbellChart } from "@/components/chart/DumbellChart";

interface ITopCurrencies {}

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
            <Grid item md={4} xs={12}>
              <PieChartWithTabs />
            </Grid>
            <Grid item md={7} xs={12}>
              {/* <DumbellChart /> */}
              <BarChartLayout />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export { MyInvestments };
