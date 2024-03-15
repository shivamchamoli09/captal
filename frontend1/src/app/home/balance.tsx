import { Card } from "@/components/base/Card";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface IBalance {}

const Balance: React.FC<IBalance> = (props) => {
  return (
    <Card>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="h3" gutterBottom>
            Balance
          </Typography>
          <Typography variant="h2">$ 68.778,44</Typography>
        </Box>
        <Typography
          variant="caption"
          color={"success.main"}
        >
          <ArrowUpwardIcon />
          4.8%
        </Typography>
      </Box>

      <Grid container sx={{ justifyContent: "space-between", mt: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h5">Income</Typography>
          <Stack direction={"row"} alignItems={"center"}>
            <NorthEastIcon color={"success"} />
            <Typography variant="body1" color={"success.main"}>
              $ 21,000
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} textAlign={"end"}>
          <Typography variant="h5">Expenses</Typography>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"end"}>
            <SouthWestIcon color="error" />
            <Typography variant="body1" color="error">
              $ 21,000
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export { Balance };
