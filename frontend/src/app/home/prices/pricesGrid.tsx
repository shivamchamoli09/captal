"use client";

import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CurrencyTypes } from "@/core/types/currency.type";
import {
  getCryptoPrices,
  getCurrencies,
  getStockPrices,
} from "@/lib/external/currencyPrices";
import { useQuery } from "@tanstack/react-query";
const yf2 = require("yahoo-finance2").default;
import { useEffect } from "react";
import { useCurrencyStore } from "@/store/currencies.store";

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
  const { data: prices } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const curr = await getCurrencies();
      setCurrencies([...curr?.stocks, ...curr?.crypto]);
      return curr;
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log("removing");
  //     yf2._opts.cookieJar.removeAllCookiesSync();
  //   }, 60_000 * 10);
  // }, []);
  const [value, setValue] = React.useState<keyof typeof CurrencyTypes>(
    CurrencyTypes.CRYPTO
  );

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: keyof typeof CurrencyTypes
  ) => {
    setValue(newValue);
  };

  if (!prices) return <>Loading...</>;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {Object.keys(CurrencyTypes).map((currency) => (
                <Tab key={currency} label={currency} value={currency} />
              ))}
            </TabList>
          </Box>
        </TabContext>
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
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export { PricesGrid };
