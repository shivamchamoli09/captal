import { CurrencyTypes } from "@/core/types/currency.type";
import { CurrencySchemaType } from "@/lib/domains";
import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Chip,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const OptionsType = {
  all: "all",
  crypto: "crypto",
  stocks: "stocks",
} as const;

interface IAddMipForm {
  currencyOptions: Array<CurrencySchemaType>;
}

const AddMipForm: React.FC<IAddMipForm> = ({ currencyOptions }) => {
  const { register, setValue } = useFormContext();
  const [optionsType, setOptionsType] =
    useState<keyof typeof OptionsType>("all");
  const [options, setOptions] =
    useState<Array<CurrencySchemaType>>(currencyOptions);

  useEffect(() => {
    if (optionsType === "all") {
      setOptions(currencyOptions);
      return;
    }
    if (optionsType === "crypto") {
      setOptions(
        currencyOptions.filter((c) => c?.quoteType === "CRYPTOCURRENCY")
      );
      return;
    }
    setOptions(currencyOptions.filter((c) => c?.quoteType === "EQUITY"));
  }, [currencyOptions, optionsType]);

  return (
    <Stack direction={"row"} flexDirection={"column"} gap={3}>
      <TextField label="Name" {...register("name")} />

      <Stack display={'flex'} flexDirection={'column'} gap={1.5}>
        <ButtonGroup sx={{ margin: "10px 0", ml: "auto" }}>
          {Object.keys(OptionsType).map((c) => (
            <Button
              key={c}
              onClick={() => setOptionsType(c as keyof typeof OptionsType)}
              variant={optionsType === c ? "contained" : "outlined"}
              sx={{ textTransform: "capitalize" }}
            >
              {c}
            </Button>
          ))}
        </ButtonGroup>
        <Autocomplete
          {...register("currencies")}
          options={options}
          onChange={(_, value) => {
            setValue("currencies", value);
          }}
          getOptionLabel={(option) => `${option.shortName}`}
          multiple
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField {...params} label="Search currency" />
          )}
        />
      </Stack>
    </Stack>
  );
};

export { AddMipForm };
