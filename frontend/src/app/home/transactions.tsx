import { CurrencyListSchemaType } from "@/lib/domains";
import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { getDailyGainers } from "@/lib/external/currencyPrices";
import { Avatar, Box, List, Stack, SxProps, Typography } from "@mui/material";
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
    <Box p={1}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h2" fontWeight={"medium"}>
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
            {/* <Box display={"flex"} gap={2} alignItems={"center"}> */}
            <Avatar sx={{ height: "32px", width: "32px" }}>
              {tran.symbol}
            </Avatar>
            <Typography variant="h6" fontWeight="normal" ml={1} width={"180px"}>
              {tran.shortName}
            </Typography>

            <Typography variant="body1" fontWeight={"medium"} ml="auto">
              ${tran.regularMarketPrice?.toLocaleString?.()}
            </Typography>
          </Stack>
        ))}
      </List>
    </Box>
  );
};

export { Transactions };
