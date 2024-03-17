import { CRYPTO_DUMMY_DATA } from "@/lib/crypto.lib";
import { Autocomplete, Stack, TextField } from "@mui/material";
import React from "react";

interface IAddMipForm {}

const AddMipForm: React.FC<IAddMipForm> = () => {
  return (
    <Stack direction={"row"} flexDirection={"column"} gap={3}>
      <TextField label="Name" />
      {/* <TextField label="Select currency" /> */}

      <Autocomplete
        options={CRYPTO_DUMMY_DATA}
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
