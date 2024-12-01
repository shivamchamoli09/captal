"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Stack, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { CurrencyTypes } from "@/core/types/currency.type";
import { getCurrencies } from "@/lib/external/currencyPrices";
import { useQuery } from "@tanstack/react-query";
import { useCurrencyStore } from "@/store/currencies.store";
import { Tabs } from "@/components/base/Tabs";
import { Card } from "@/components/base/Card";
import { CurrencySchemaType } from "@/lib/domains";
import { debounce } from "@mui/material/utils";
import { convertToInternationalCurrencySystem } from "@/lib/utils/parser";

interface IPricesGrid {}

const columns: GridColDef[] = [
  { headerName: "Symbol", field: "symbol", width: 90 },
  {
    headerName: "Name",
    field: "shortName",
    width: 120,
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
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>${convertToInternationalCurrencySystem(params.value!)}</>
    ),
  },
  {
    headerName: "Regular Volume",
    field: "regularMarketVolume",
    type: "number",
    width: 110,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>{convertToInternationalCurrencySystem(params.value!)}</>
    ),
  },
  {
    headerName: "Shares Outstanding",
    field: "sharesOutstanding",
    type: "number",
    width: 130,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>{convertToInternationalCurrencySystem(params.value!)}</>
    ),
  },
  {
    headerName: "Current price",
    field: "regularMarketPrice",
    type: "number",
    width: 90,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>
        $
        {params.value?.toLocaleString?.("en-US", {
          maximumFractionDigits: 2,
        })}
      </>
    ),
  },
  {
    headerName: "Open",
    field: "regularMarketOpen",
    type: "number",
    width: 90,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>
        $
        {params.value?.toLocaleString?.("en-US", {
          maximumFractionDigits: 2,
        })}
      </>
    ),
  },
  {
    headerName: "High",
    field: "regularMarketDayHigh",
    type: "number",
    width: 90,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>
        $
        {params.value?.toLocaleString?.("en-US", {
          maximumFractionDigits: 2,
        })}
      </>
    ),
  },
  {
    headerName: "Low",
    field: "regularMarketDayLow",
    type: "number",
    width: 90,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>
        $
        {params.value?.toLocaleString?.("en-US", {
          maximumFractionDigits: 2,
        })}
      </>
    ),
  },
  {
    headerName: "Closed",
    field: "regularMarketPreviousClose",
    type: "number",
    width: 100,
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <>
        $
        {params.value?.toLocaleString?.("en-US", {
          maximumFractionDigits: 2,
        })}
      </>
    ),
  },
  {
    headerName: "Market",
    field: "marketState",
    width: 100,
  },
];

const PricesGrid: React.FC<IPricesGrid> = () => {
  const { setCurrencies } = useCurrencyStore();
  const apiRef = useGridApiRef();
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: prices } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const curr = await getCurrencies();
      const stockMap = new Map<string, CurrencySchemaType>();
      for (const s of [...curr?.stocks, ...curr?.nse]) {
        if (!s.shortName) continue;
        if (stockMap.has(s.shortName)) continue;
        stockMap.set(s.shortName, s);
      }
      setCurrencies([...curr?.crypto, ...stockMap?.values()]);
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

  const updateSearchValue = React.useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split(" ").filter((word: string) => word !== "")
      );
    }, 300);
  }, [apiRef]);

  function handleSearchValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setSearchValue(newValue);
    updateSearchValue(newValue);
  }

  const getRowsByCurrencyType = useMemo(() => {
    if (value === CurrencyTypes.CRYPTO) return prices?.crypto;
    else if (value === CurrencyTypes.NYSE) return prices?.stocks;
    return prices?.nse;
  }, [prices, value]);

  if (!prices) return <>Loading...</>;

  return (
    <Card sx={{ height: 400, width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        // sx={{ width: "100%" }}
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.only("xs")]: {
            display: "block",
          },
        })}>
        {/* <Tabs
          tabs={Object.keys(CurrencyTypes)}
          value={value}
          onChange={(val) => setValue(val as typeof value)}
        /> */}
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{
            height: "40px",
            mb: 2,
            ".MuiButtonBase-root": {
              border: "none",
              ":hover": {
                backgoundColor: "#0f5940",
              },
            },
          }}>
          {Object.keys(CurrencyTypes).map((val) => (
            <Button
              key={val}
              variant={value === val ? "contained" : "outlined"}
              onClick={() => {
                setValue(val as typeof value);
              }}
              sx={{ fontWeight: "normal", fontSize: "13px" }}>
              {val}
            </Button>
          ))}
        </ButtonGroup>

        <TextField
          variant="standard"
          value={searchValue}
          onChange={handleSearchValueChange}
          label="Search"
          sx={(theme) => ({
            mb: 1,
            [theme.breakpoints.only("sm")]: {
              ml: "auto",
            },
            [theme.breakpoints.only("xs")]: {
              display: "none",
            },
          })}
        />
      </Stack>
      <DataGrid
        apiRef={apiRef}
        getRowId={(row) => row.symbol}
        rows={getRowsByCurrencyType!}
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
