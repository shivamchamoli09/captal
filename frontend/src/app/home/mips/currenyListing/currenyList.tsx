import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { Avatar, Box, List, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { ILatestCurrency } from "@/core/types/currency.type";
import { ProgressIcon, getProgressColor } from "../mip.service";

interface ICurrencyList {
  currencies?: Array<ILatestCurrency>;
}

const CurrencyList: React.FC<ICurrencyList> = ({ currencies }) => {
  const AvatarTemplate = ({ currency }: { currency?: CryptoSchemaType }) => {
    if (!currency) return <></>;
    if (currency?.logoUrl) {
      return (
        <Image src={currency?.logoUrl!} width={30} height={30} alt="Currency" />
      );
    }
    return <Avatar>{currency?.symbol}</Avatar>;
  };

  const calculateChangePercent = useCallback(
    (prevprice: number, currPrice: number) => {
      return Math.abs(((currPrice - prevprice) / prevprice) * 100)?.toFixed(2);
    },
    []
  );
  return (
    <List>
      {currencies?.map((tran) => (
        <Stack
          key={tran.shortName}
          direction={"row"}
          justifyContent={"space-between"}
          mb={2}
          alignItems={"center"}
        >
          <Box display={"flex"} gap={2} alignItems={"center"} width={180}>
            <AvatarTemplate currency={tran} />
            <Typography variant="h6" >
              {tran.shortName}
            </Typography>
          </Box>

          <Typography variant="h6" width={100} ml={2}>
            ${tran.regularMarketPrice?.toLocaleString?.()}
          </Typography>

          <Stack direction={"row"}>
            <ProgressIcon
              netDiff={tran.latestRegularMarketPrice - tran.regularMarketPrice}
            />
            <Typography
              variant="body1"
              color={getProgressColor(
                tran.latestRegularMarketPrice - tran.regularMarketPrice
              )}
              fontWeight={"medium"}
              width={100}
            >
              {calculateChangePercent(
                tran.regularMarketPrice,
                tran.latestRegularMarketPrice
              )}
              %
            </Typography>
          </Stack>
          <Box>
            <Typography variant="h6" width={100}>
              ${tran.latestRegularMarketPrice?.toLocaleString?.()}
            </Typography>
          </Box>
        </Stack>
      ))}
    </List>
  );
};

export { CurrencyList };
