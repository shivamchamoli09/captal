"use client";

import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CurrencyTypes } from "@/core/types/currency.type";
import { getCurrencyPrices } from "@/lib/external/stockPrices";
import { useQuery } from "@tanstack/react-query";

interface IPricesGrid {}

const columns: GridColDef[] = [
  { headerName: "ID", field: "id", width: 90 },
  {
    headerName: "Name",
    field: "name",
    width: 100,
    editable: true,
  },
  {
    headerName: "Symbol",
    field: "symbol",
    width: 60,
    editable: true,
  },
  {
    headerName: "Current price",
    field: "current_price",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    headerName: "Market Cap",
    field: "market_cap",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    headerName: "Total Volume",
    field: "total_volume",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    headerName: "High",
    field: "high_24h",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    headerName: "Low",
    field: "low_24h",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    headerName: "Total Supply",
    field: "total_supply",
    type: "number",
    width: 110,
    editable: true,
  },
];

const PricesGrid: React.FC<IPricesGrid> = () => {
  const { data: prices } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => await getCurrencyPrices(),
  });
  const [value, setValue] = React.useState<keyof typeof CurrencyTypes>(CurrencyTypes.CRYPTO);

  const handleChange = (event: React.SyntheticEvent, newValue: keyof typeof CurrencyTypes) => {
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
        rows={prices.crypto}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 5,
        //     },
        //   },
        // }}
        // pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export { PricesGrid };
