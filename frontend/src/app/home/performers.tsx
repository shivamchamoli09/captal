"use client";
import { Stack, Card, Box, Typography, Skeleton } from "@mui/material";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { CurrencySchemaType } from "@/lib/domains";
import { getQuotes } from "@/lib/external/currencyPrices";
import { ProgressIcon, getProgressColor } from "./mips/mip.service";
import { Avatar } from "@/core/theme/base/Avatar";

const cardStyles = {
  p: 2,
  gap: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "170px",
  height: "175px",
};

interface ITopBadPerformer {}

const top10Symbols: Array<string> = [
  "AAPL",
  "GOOG",
  "AMZN",
  "MSFT",
  "NVDA",
  "META",
  "TSLA",
  "JPM",
  "WMT",
  "AMD",
  "NFLX",
  "T",
  "BA",
  "F",
  "INTC",
  "CSCO",
];

function getRandomValues(arr: Array<string>) {
  // Generate random indices
  const index1 = Math.floor(Math.random() * arr.length);
  let index2 = Math.floor(Math.random() * arr.length);
  // Ensure index2 is not the same as index1
  while (index2 === index1) {
    index2 = Math.floor(Math.random() * arr.length);
  }
  // Return the values at the random indices
  return [arr[index1], arr[index2]];
}

const TopBadPerformer: React.FC<ITopBadPerformer> = () => {
  let { data: quotes, isLoading } = useQuery<Array<CurrencySchemaType>>({
    queryKey: [""],
    queryFn: () =>
      getQuotes({ symbols: getRandomValues(top10Symbols)?.join(",") }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Card sx={cardStyles}>
          <Skeleton variant="circular" width={36} height={36} />
          <Skeleton variant="rectangular" width={80} height={20} />
          <Skeleton
            variant="rectangular"
            width={80}
            height={15}
            sx={{ mt: 1 }}
          />
          <Skeleton variant="rectangular" width={20} height={15} />
        </Card>
        <Card sx={cardStyles}>
          <Skeleton variant="circular" width={36} height={36} />
          <Skeleton variant="rectangular" width={80} height={20} />
          <Skeleton
            variant="rectangular"
            width={80}
            height={15}
            sx={{ mt: 1 }}
          />
          <Skeleton variant="rectangular" width={20} height={15} />
        </Card>
      </Stack>
    );
  }
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      {quotes?.map((quote, i) => (
        <Card key={quote.symbol} sx={cardStyles}>
          <Avatar sx={{ width: "40px", height: "40px" }}>
            {quote.symbol?.[0]}
          </Avatar>
          <Box width="100%">
            <Typography
              variant="h6"
              textAlign={"center"}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {quote.shortName}
            </Typography>
            <Stack mt={2}>
              <Typography variant="h6" textAlign={"center"} gutterBottom>
                $
                {quote.regularMarketPrice?.toLocaleString?.("en-US", {
                  maximumFractionDigits: 2,
                })}
              </Typography>

              <Box ml="auto" mr="auto" display={"flex"} alignItems={"center"}>
                <ProgressIcon netDiff={quote.regularMarketChangePercent!} />
                <Typography
                  variant="body1"
                  color={getProgressColor(quote.regularMarketChangePercent!)}
                >
                  {Math.abs(quote.regularMarketChangePercent!)?.toFixed(2)}%
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Card>
      ))}
    </Stack>
  );
};

export { TopBadPerformer };
