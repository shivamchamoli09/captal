import { Card } from "@/components/base/Card";
import { Box, Grid, Stack, Typography, Skeleton } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useMipStore } from "@/store";
import { MipSchemaType } from "@/lib/domains/mipSchema";
import { ProgressIcon, getProgressColor } from "./mips/mip.service";

interface IBalance {}

const Balance: React.FC<IBalance> = (props) => {
  const { mipList, mipCurrentBalanceById, isLoading } = useMipStore();

  const investedAmount = useMemo(() => {
    let total = 0;
    for (let mip of mipList) {
      total += mip.currencies?.reduce((p, c) => p + c.regularMarketPrice, 0);
    }
    return Number(total?.toFixed(3));
  }, [mipList]);

  const latestBal = useMemo(() => {
    if (!mipCurrentBalanceById?.size) return 0;
    let total = 0;
    for (const v of mipCurrentBalanceById?.values()) {
      total += v;
    }
    return Number(total.toFixed(3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mipCurrentBalanceById?.size]);

  const netDiff = Number((latestBal - investedAmount)?.toFixed(3));
  const changePercent = useMemo(() => {
    if (!netDiff || !investedAmount) return 0;
    return Math.abs((netDiff / investedAmount) * 100)?.toFixed(2);
  }, [netDiff, investedAmount]);

  return (
    <Card>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={100} />
      ) : (
        <>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="h4" gutterBottom fontWeight={"medium"}>
                Balance
              </Typography>
              <Typography variant="h3">
                ${latestBal?.toLocaleString?.()}
              </Typography>
            </Box>

            <Stack direction={"row"} alignItems={"center"}>
              <ProgressIcon netDiff={netDiff} />
              <Typography
                variant="caption"
                color={getProgressColor(netDiff)}
                display={"flex"}
              >
                {changePercent}%
              </Typography>
            </Stack>
          </Box>

          <Grid container sx={{ justifyContent: "space-between", mt: 3 }}>
            <Grid item xs={6}>
              <Typography variant="h6">P&L</Typography>
              <Typography
                variant="h6"
                color={getProgressColor(netDiff)}
                fontWeight={"bold"}
              >
                ${netDiff?.toLocaleString?.()}
              </Typography>
            </Grid>

            <Grid item xs={6} textAlign={"end"}>
              <Typography variant="h6">Invested</Typography>
              <Typography variant="body1" color={"text"}>
                ${investedAmount?.toLocaleString?.()}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
};

export { Balance };
