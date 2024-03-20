import { CRYPTO_DUMMY_DATA } from "@/lib/crypto.lib";
import { Autocomplete, Stack, TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IAddMipForm {}

const AddMipForm: React.FC<IAddMipForm> = () => {
  const { register, setValue } = useFormContext();
  return (
    <Stack direction={"row"} flexDirection={"column"} gap={3}>
      <TextField label="Name" {...register("name")} />

      <Autocomplete
        {...register("currencies")}
        options={CRYPTO_DUMMY_DATA}
        onChange={(_, value) => {
          setValue("currencies", value);
        }}
        getOptionLabel={(option) => `${option.name}`}
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
