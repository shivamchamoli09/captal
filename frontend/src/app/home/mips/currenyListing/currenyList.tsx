import { CryptoSchemaType } from "@/lib/domains/cryptoSchema";
import { Box, List, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { ILatestCurrency } from "@/core/types/currency.type";
import { ProgressIcon, getProgressColor } from "../mip.service";
import { Avatar } from "@/core/theme/base/Avatar";

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
    return <Avatar>{currency?.symbol?.[0]}</Avatar>;
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
          justifyContent={"flex-start"}
          mb={2}
          alignItems={"center"}
          gap={2}
        >
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <AvatarTemplate currency={tran} />
            <Typography variant="h6" width={180}>
              {tran.shortName}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            textAlign={"start"}
            sx={{
              wordWrap: "break-word",
            }}
            width={100}
            minWidth={100}
          >
            ${tran.regularMarketPrice?.toLocaleString?.()}
          </Typography>

          <Stack direction={"row"} width={120} minWidth={120}>
            <ProgressIcon
              netDiff={tran.latestRegularMarketPrice - tran.regularMarketPrice}
            />
            <Typography
              variant="body1"
              color={getProgressColor(
                tran.latestRegularMarketPrice - tran.regularMarketPrice
              )}
              fontWeight={"medium"}
              sx={{
                wordWrap: "break-word",
              }}
            >
              {calculateChangePercent(
                tran.regularMarketPrice,
                tran.latestRegularMarketPrice
              )}
              %
            </Typography>
          </Stack>
          <Typography
            textAlign={"end"}
            width={100}
            variant="h6"
            sx={{
              wordWrap: "break-word",
            }}
          >
            ${tran.latestRegularMarketPrice?.toLocaleString?.()}
          </Typography>
        </Stack>
      ))}
    </List>
  );
};

export { CurrencyList };
