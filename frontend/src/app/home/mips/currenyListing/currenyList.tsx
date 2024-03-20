import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { Box, List, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";

interface ICurrencyList {
  currencies?: Array<CryptoSchemaType>;
}

const CurrencyList: React.FC<ICurrencyList> = ({ currencies }) => {
  return (
    <List>
      {currencies?.map((tran) => (
        <Stack
          key={tran.id}
          direction={"row"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Box display={"flex"} gap={2} alignItems={"center"} width={180}>
            <Image src={tran.image!} width={30} height={30} alt="Currency" />
            <Typography variant="h6" fontWeight="normal">
              {tran.name}
            </Typography>
          </Box>

          <Box ml={2}>
            <Typography variant="body1" fontWeight={"medium"} width={100}>
              $ {tran.current_price?.toLocaleString?.()}
            </Typography>
          </Box>
          <Stack direction={"row"}>
            <NorthEastIcon color="success" />
            <Typography
              variant="body1"
              color={"success.main"}
              fontWeight={"medium"}
              width={100}
            >
              22%
            </Typography>
          </Stack>
          <Box>
            <Typography variant="body1" fontWeight={"medium"} width={100}>
              $ {tran.current_price?.toLocaleString?.()}
            </Typography>
          </Box>
        </Stack>
      ))}
    </List>
  );
};

export { CurrencyList };
