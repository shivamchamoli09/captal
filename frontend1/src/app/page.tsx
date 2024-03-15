"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MyInvestments } from "./home/myInvestments";
import { Box, Stack } from "@mui/material";
import { Card } from "@/components/base/Card";
import { PricesGrid } from "./home/pricesGrid";

export default function Home() {
  const { data: cryptos } = useQuery({
    queryKey: ["crypto"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      return await response.json();
    },
  });
  // if (!cryptos) return <>Loading...</>;
  return (
    // <div>
    //   <ul>
    //     {cryptos?.map((c) => (
    //       <li key={c.id}>
    //         {c.name} {": "} ${c.current_price}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <Stack sx={{ p: 4 }} gap={2}>
      Dashboard
      <Stack display={"row"} flexDirection={"column"} gap={2}>
        <MyInvestments />
        <Card>
          <PricesGrid />
        </Card>
      </Stack>
    </Stack>
  );
}
