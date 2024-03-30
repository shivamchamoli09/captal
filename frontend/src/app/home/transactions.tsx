import { Card } from "@/components/base/Card";
import { Avatar } from "@/core/theme/base/Avatar";
import { CurrencyListSchemaType } from "@/lib/domains";
import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { getDailyGainers } from "@/lib/external/currencyPrices";
import { Box, List, Stack, SxProps, Typography } from "@mui/material";
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
  const { data: transactions } = useQuery<CurrencyListSchemaType>({
    queryKey: ["dailyGainers"],
    queryFn: async () => await getDailyGainers(),
    retry: 0,
    refetchOnWindowFocus: false,
  });
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
    <Card sx={{ p: 2 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          variant="h2"
          fontWeight={"medium"}
          width={"100%"}
          textAlign={"center"}
        >
          Top 5 Gainers
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
                ${tran.regularMarketPrice?.toLocaleString?.()}
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
