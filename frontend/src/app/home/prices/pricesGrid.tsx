"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { CurrencyTypes } from "@/core/types/currency.type";
import { getCurrencies } from "@/lib/external/currencyPrices";
import { useQuery } from "@tanstack/react-query";
import { useCurrencyStore } from "@/store/currencies.store";
import { Tabs } from "@/components/base/Tabs";
import { Card } from "@/components/base/Card";

interface IPricesGrid {}

const columns: GridColDef[] = [
  { headerName: "Symbol", field: "symbol", width: 90 },
  {
    headerName: "Name",
    field: "shortName",
    width: 120,
    editable: true,
  },
  {
    headerName: "Currency",
    field: "currency",
    type: "string",
    width: 80,
  },
  {
    headerName: "Market Cap",
    field: "marketCap",
    type: "number",
    width: 130,
    editable: true,
  },
  {
    headerName: "Regular Volume",
    field: "regularMarketVolume",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    headerName: "Shares Outstanding",
    field: "sharesOutstanding",
    type: "number",
    width: 130,
    editable: true,
  },
  {
    headerName: "Current price",
    field: "regularMarketPrice",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    headerName: "Open",
    field: "regularMarketOpen",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    headerName: "High",
    field: "regularMarketDayHigh",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    headerName: "Low",
    field: "regularMarketDayLow",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    headerName: "Closed",
    field: "regularMarketPreviousClose",
    type: "number",
    width: 100,
    editable: true,
  },
  {
    headerName: "Market",
    field: "marketState",
    width: 100,
    editable: true,
  },
];

const PricesGrid: React.FC<IPricesGrid> = () => {
  const { setCurrencies } = useCurrencyStore();
  const { data: prices } = 
  useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const curr = await getCurrencies();
      setCurrencies([...curr?.stocks, ...curr?.crypto]);
      return curr;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    async function getQuotes() {
      const res = await getCurrencies();
    }

    getQuotes();
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log("removing");
  //     yf2._opts.cookieJar.removeAllCookiesSync();
  //   }, 60_000 * 10);
  // }, []);
  const [value, setValue] = React.useState<keyof typeof CurrencyTypes>(
    CurrencyTypes.CRYPTO
  );

  if (!prices) return <>Loading...</>;

  return (
    <Card sx={{ height: 400, width: "100%" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Tabs
          tabs={Object.keys(CurrencyTypes)}
          value={value}
          onChange={(val) => setValue(val as typeof value)}
        />
      </Box>
      <DataGrid
        getRowId={(row) => row.symbol}
        rows={value === CurrencyTypes.CRYPTO ? prices?.crypto : prices?.stocks}
        columns={columns}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{ ".MuiDataGrid-footerContainer": { display: "none" } }}
        disableRowSelectionOnClick
      />
    </Card>
  );
};

export { PricesGrid };
