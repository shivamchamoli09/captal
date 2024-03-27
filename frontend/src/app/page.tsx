"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MyInvestments } from "./home/myInvestments";
import { Box, Grid, Stack, SxProps, Typography } from "@mui/material";
import { Card } from "@/components/base/Card";
import { PricesGrid } from "./home/prices/pricesGrid";
import { Transactions } from "./home/transactions";
import { CRYPTO_DUMMY_DATA } from "@/lib/crypto.lib";
import { MipList } from "./home/mips/mipList";
import { BlogList } from "./home/blogs/blogList";
import { FeedBackForm } from "./home/feedback";

export default function Home() {
  return (
    <Stack sx={{ p: 3 }} gap={2}>
      <Stack display={"row"} flexDirection={"column"} gap={2}>
        <MyInvestments />
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <MipList />
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <Transactions />
            </Card>
          </Grid>
        </Grid>

        <PricesGrid />

        <Grid container mt={8} spacing={2}>
          <Grid item md={8} xs={12}>
            <BlogList />
          </Grid>
          <Grid item md={4} xs={8}>
            <FeedBackForm />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
