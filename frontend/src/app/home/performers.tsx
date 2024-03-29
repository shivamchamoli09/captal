import { Stack, Card, Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import { useQuery } from "@tanstack/react-query";
import { CurrencySchemaType } from "@/lib/domains";
import { getQuotes } from "@/lib/external/currencyPrices";
import { ProgressIcon, getProgressColor } from "./mips/mip.service";

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
  const { data: quotes } = useQuery<Array<CurrencySchemaType>>({
    queryKey: [""],
    queryFn: () =>
      getQuotes({ symbols: getRandomValues(top10Symbols)?.join(",") }),
    refetchOnWindowFocus: false,
  });
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      {quotes?.map((quote) => (
        <Card
          key={quote.symbol}
          sx={{
            p: 2,
            gap: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "170px",
            height: "175px",
          }}
        >
          <Image src={"/bitcoin.png"} width={40} height={40} alt="BTC" />
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
                ${quote.regularMarketPrice?.toLocaleString?.()}
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
      {/* <Card
        sx={{
          p: 2,
          gap: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={"/bitcoin.png"} width={40} height={40} alt="BTC" />
        <Box>
          <Typography variant="h5">Low Performer</Typography>
          <Stack direction={"row"} alignItems={"end"} mt={1}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Apple
              </Typography>

              <Typography variant="h6">$4200</Typography>
            </Box>
            <Box ml="auto" display={"flex"} alignItems={"center"}>
              <SouthWestIcon color="error" />
              <Typography variant="body1" color={"error.main"}>
                $42
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Card> */}
    </Stack>
  );
};

export { TopBadPerformer };
