"use client";

import React from "react";
import { BarChartData, LineChartData } from "./lib/data";
import { Box, Grid, Stack, Theme, Typography, useTheme } from "@mui/material";
import { Card } from "@/components/base/Card";
import { Balance } from "./balance";
import { TopBadPerformer } from "./performers";
import { PieChartWithTabs } from "./charts/pieChartWithTabs";
import { BarChartLayout } from "./charts/barChartLayout";
import { useMipStore } from "@/store";
import { AddOutlined } from "@mui/icons-material";

interface ITopCurrencies {}

const MyInvestments: React.FC<ITopCurrencies> = () => {
  const { mipList, isLoading } = useMipStore();

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
        <Card sx={{ height: "100%" }}>
          {mipList?.length || isLoading ? (
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item md={4} xs={12}>
                <PieChartWithTabs />
              </Grid>
              <Grid item md={7} xs={12}>
                <BarChartLayout />
              </Grid>
            </Grid>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                pl: 4,
                pr: 4,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Embark on a journey of financial empowerment and growth with our
                innovative MIP (Mixed Investment Plan) solutions, designed to
                help you realize your long-term goals through disciplined and
                strategic investment, one mip at a time. Click on the add icon
                above to create your first mip.
              </Typography>
            </Box>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export { MyInvestments };
