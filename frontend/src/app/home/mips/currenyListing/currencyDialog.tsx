import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { CRYPTO_DUMMY_DATA } from "@/lib/crypto.lib";
import { CurrencyList } from "./currenyList";
import { CloseOutlined } from "@mui/icons-material";
import { useMipStore } from "@/store";
import Image from "next/image";
import { CurrencyListSchemaType } from "@/lib/domains";
import { useQueryClient } from "@tanstack/react-query";
import { ILatestCurrency } from "@/core/types/currency.type";
import { ProgressIcon, getProgressColor } from "../mip.service";

interface ICurrencyListDialog {
  open: boolean;
  onClose?: () => void;
  id?: string;
}

export const CurrencyListDialog: React.FC<ICurrencyListDialog> = ({
  open,
  onClose,
  id,
}) => {
  const handleClose = () => {
    onClose?.();
  };
  const queryClient = useQueryClient();
  const latestPrices = queryClient.getQueryData<CurrencyListSchemaType>([id]);

  const { mipList } = useMipStore();
  const currentMip = mipList.find((e) => e.id === id);

  const updatedMarketPrices: Array<ILatestCurrency> = useMemo(() => {
    if (!currentMip?.id) return [];
    const currencies = currentMip?.currencies;
    if (!latestPrices) return currencies;
    let latestCurr: Array<ILatestCurrency> = Array.from(currencies);
    for (let i = 0; i < currencies.length; i++) {
      latestCurr[i].latestRegularMarketPrice =
        latestPrices[i]?.regularMarketPrice;
    }
    return currencies;
  }, [currentMip?.id, currentMip?.currencies, latestPrices]);
  const totalAmount = Number(
    currentMip?.currencies
      .reduce((p, c) => p + c?.regularMarketPrice, 0)
      ?.toFixed(3)
  );
  const totalNewAmount = Number(
    updatedMarketPrices
      ?.reduce((p, c) => p + c.latestRegularMarketPrice, 0)
      ?.toFixed(3)
  );
  const calculateChangePercent = useMemo(() => {
    return Math.abs(
      ((totalNewAmount - totalAmount) / totalAmount) * 100
    )?.toFixed(2);
  }, [totalAmount, totalNewAmount]);

  const AvatarTemplate = ({
    currencies,
  }: {
    currencies?: CurrencyListSchemaType;
  }) => {
    if (!currencies) return <></>;
    const crypto = currencies?.find((e) => e.quoteType === "CRYPTOCURRENCY");
    if (crypto) {
      return <Image src={crypto?.logoUrl!} width={30} height={30} alt="Mip" />;
    }
    return <Avatar>{currencies?.[0]?.symbol}</Avatar>;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="currency-dialog-labael"
      aria-describedby="currency-dialog-description"
    >
      <DialogTitle id="currency-dialog-title">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          gap={2}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <AvatarTemplate currencies={currentMip?.currencies} />
              <Typography variant="h3">{currentMip?.name}</Typography>
            </Stack>
            <Typography variant="body1">
              {currentMip?.currencies?.length} Holdings
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box>
          <CurrencyList currencies={updatedMarketPrices} />

          <Stack direction={"row"} gap={2} justifyContent={"end"}>
            <Card
              sx={{
                width: "fit-content",
                marginLeft: "auto",
                position: "sticky",
                bottom: 0,
                padding: 2,
              }}
            >
              <Typography variant="h5">
                Invested: ${totalAmount?.toLocaleString?.()}
              </Typography>
            </Card>
            <Card
              sx={{
                width: "fit-content",
                position: "sticky",
                bottom: 0,
                padding: 2,
              }}
            >
              <Stack direction={"row"} gap={3} alignItems={"center"}>
                <Stack direction={"row"} alignItems={"center"}>
                  <ProgressIcon netDiff={totalNewAmount - totalAmount!} />
                  <Typography
                    variant="body1"
                    color={getProgressColor(totalNewAmount - totalAmount!)}
                  >
                    {calculateChangePercent}%
                  </Typography>
                </Stack>
                <Typography
                  variant="h5"
                  color={getProgressColor(totalNewAmount - totalAmount!)}
                >
                  ${totalNewAmount?.toLocaleString?.()}
                </Typography>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
