import {
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { CRYPTO_DUMMY_DATA } from "@/lib/crypto.lib";
import { CurrencyList } from "./currenyList";
import { CloseOutlined } from "@mui/icons-material";
import { useMipStore } from "@/store";
import Image from "next/image";

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

  const { mipList } = useMipStore();
  const currentMip = mipList.find((e) => e.id === id);
  const totalAmount = currentMip?.currencies.reduce(
    (p, c) => p + c?.current_price,
    0
  );

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
            <Stack direction={"row"} gap={1} alignItems={'start'}>
              <Image
                src={currentMip?.currencies[0]?.image!}
                width={30}
                height={30}
                alt="Mip"
              />
              <Typography variant="h3">{currentMip?.name}</Typography>
            </Stack>
            <Typography variant="body1">
              {currentMip?.currencies?.length} currencies
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box>
          <CurrencyList currencies={currentMip?.currencies} />
          <Card
            sx={{
              width: "fit-content",
              marginLeft: "auto",
              position: "sticky",
              bottom: 0,
              padding: 2,
            }}
          >
            <Typography variant="h4">
              Total: ${totalAmount?.toFixed(3)?.toLocaleString?.()}
            </Typography>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
