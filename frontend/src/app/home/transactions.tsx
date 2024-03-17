import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { Box, Card, List, Stack, SxProps, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface ITransactions {
  transactions?: Array<CryptoSchemaType>;
}

const boxStyles: SxProps = {
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
};

const Transactions: React.FC<ITransactions> = ({ transactions }) => {
  if (!transactions?.length)
    return (
      <Box sx={boxStyles}>
        <Typography>
          Unable to fetch transacations at the moment. <br /> Please check after
          some time.
        </Typography>
      </Box>
    );
  return (
    <Box p={1}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h2" fontWeight={"medium"}>
          Transactions
        </Typography>
        <Typography component={"a"} variant="caption">
          {"View all " + " >"}
        </Typography>
      </Stack>

      <List>
        {transactions?.map((tran) => (
          <Stack
            key={tran.id}
            direction={"row"}
            justifyContent={"space-between"}
            mt={2}
          >
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <Image src={tran.image!} width={30} height={30} alt="Currency" />
              <Typography variant="h5" fontWeight="normal">
                {tran.name}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body1" fontWeight={"medium"}>
                $ {tran.current_price?.toLocaleString?.()}
              </Typography>
            </Box>
          </Stack>
        ))}
      </List>
    </Box>
  );
};

export { Transactions };
