"use client";

import { MyInvestments } from "./home/myInvestments";
import { Box, Grid, Stack} from "@mui/material";
import { PricesGrid } from "./home/prices/pricesGrid";
import { Transactions } from "./home/transactions";
import { MipList } from "./home/mips/mipList";
import { BlogList } from "./home/blogs/blogList";
import { FeedBackForm } from "./home/feedback";

export default function Home() {

  return (
    <Stack sx={{ p: 3 }} gap={2}>
      <Stack display={"row"} flexDirection={"column"} gap={2}>
        <MyInvestments />

        <Box mt={2}>
          {/* <Typography variant="h3" gutterBottom pl={1} fontWeight={'normal'}>
            My Mips
          </Typography> */}
          <Grid container spacing={2}>
            <Grid item md={9} xs={12}>
              <MipList />
            </Grid>
            <Grid item md={3} xs={12}>
              <Transactions />
            </Grid>
          </Grid>
        </Box>

        <PricesGrid />

        <Grid container mt={0} spacing={2}>
          <Grid item lg={8} md={12} sm={12}>
            <BlogList />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <FeedBackForm />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
