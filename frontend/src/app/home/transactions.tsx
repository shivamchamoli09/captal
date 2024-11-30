"use client";

import { Card } from "@/components/base/Card";
import { Avatar } from "@/core/theme/base/Avatar";
import { CurrencyListSchemaType } from "@/lib/domains";
import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { getDailyGainers } from "@/lib/external/currencyPrices";
import { Box, List, Skeleton, Stack, SxProps, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface ITransactions {}

const boxStyles: SxProps = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const Transactions: React.FC<ITransactions> = () => {
  const { data: transactions, isLoading } = useQuery<CurrencyListSchemaType>({
    queryKey: ["dailyGainers"],
    queryFn: async () => getDailyGainers(),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Card sx={{ p: 2 }}>
        <Skeleton
          variant="rectangular"
          width={120}
          height={20}
          sx={{ ml: "auto", mr: "auto" }}
        />
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mt={3}
            alignItems={"center"}
            key={i}
          >
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="rectangular" width={80} height={20} />
            </Stack>
            <Stack>
              <Skeleton variant="rectangular" width={80} height={15} />
              <Skeleton
                variant="rectangular"
                width={40}
                height={15}
                sx={{ mt: 1, ml: "auto" }}
              />
            </Stack>
          </Stack>
        ))}
      </Card>
    );
  }

  if (!transactions?.length)
    return (
      <Box sx={boxStyles}>
        <Typography>
          Unable to fetch transacations at the moment. <br /> Please check after
          some time.
        </Typography>
      </Box>
    );
  return (
    <Card sx={{ p: 2, overflowX: "auto" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          variant="h2"
          width={"100%"}
          textAlign={"center"}
          fontWeight="bold"
        >
          Top Gainers
        </Typography>
      </Stack>

      <List>
        {transactions?.map((tran) => (
          <Stack
            key={tran.symbol}
            direction={"row"}
            justifyContent={"space-between"}
            mt={2}
            alignItems={"center"}
          >
            <Box display={"flex"}>
              <Avatar>{tran.symbol?.[0]}</Avatar>
              <Typography
                variant="body1"
                fontWeight="normal"
                ml={1}
                width={"180px"}
              >
                {tran.shortName}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body1" fontWeight={"medium"}>
                $
                {tran.regularMarketPrice?.toLocaleString?.("en-US", {
                  maximumFractionDigits: 2,
                })}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={"medium"}
                color={"success.main"}
                ml="auto"
              >
                {tran.regularMarketChangePercent?.toFixed(2)}%
              </Typography>
            </Box>
          </Stack>
        ))}
      </List>
    </Card>
  );
};

export { Transactions };
