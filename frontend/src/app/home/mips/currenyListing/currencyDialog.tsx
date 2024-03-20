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

interface ICurrencyListDialog {
  open: boolean;
  onClose?: () => void;
  id?: string;
  // currencies?: Array<CryptoSchemaType>;
}

export const CurrencyListDialog: React.FC<ICurrencyListDialog> = ({
  open,
  onClose,
  id,
}) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="currency-dialog-labael"
      aria-describedby="currency-dialog-description"
    >
      <DialogTitle id="currency-dialog-title">
        <Stack direction={"row"} justifyContent={"space-between"} gap={2} alignItems={'center'}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography variant="h3">Title</Typography>
            <Typography variant="body1">3 currencies</Typography>
          </Stack>
          <IconButton>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box>
          <CurrencyList currencies={CRYPTO_DUMMY_DATA.slice(0, 10)} />
          <Card
            sx={{
              width: "fit-content",
              marginLeft: "auto",
              position: "sticky",
              bottom: 0,
              padding: 2,
            }}
          >
            <Typography variant="h4">Total: $4,200</Typography>
          </Card>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
