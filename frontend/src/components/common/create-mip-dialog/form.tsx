import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { Autocomplete, Stack, TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IAddMipForm {
  currencyOptions: Array<CryptoSchemaType>;
}

const AddMipForm: React.FC<IAddMipForm> = ({ currencyOptions }) => {
  const { register, setValue } = useFormContext();
  return (
    <Stack direction={"row"} flexDirection={"column"} gap={3}>
      <TextField label="Name" {...register("name")} />

      <Autocomplete
        {...register("currencies")}
        options={currencyOptions}
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
  );
};

export { AddMipForm };
