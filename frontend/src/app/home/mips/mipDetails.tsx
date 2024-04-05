import {
  Card,
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { IconWrapper } from "@/components/common/IconWrapper";
import { MipSchemaType } from "@/lib/domains/mipSchema";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { CurrencySchemaType } from "@/lib/domains";
import { getQuotes } from "@/lib/external/currencyPrices";
import { useQueryClient } from "@tanstack/react-query";
import { ProgressIcon, getProgressColor } from "./mip.service";
import { useMipStore } from "@/store";
import { Avatar } from "@/core/theme/base/Avatar";

interface IMipDetails extends MipSchemaType {
  onDelete?: (item: MipSchemaType) => void;
  onClick?: () => void;
  currentPrices?: Map<string, CurrencySchemaType>;
}

const MipDetails: React.FC<IMipDetails> = (props) => {
  const [currentTotalPrice, setCurrentTotalPrice] = useState<number>(0);
  const queryClient = useQueryClient();
  const { setMipCurrentBalance, setIsLoading, isLoading } = useMipStore();

  useEffect(() => {
    if (!props.currencies?.length) {
      setIsLoading(false);
      return;
    }
    async function fetchQuotes() {
      try {
        setIsLoading(true);
        const symbols = props.currencies?.map((e) => e?.symbol);
        const currencies = (await getQuotes({
          symbols: symbols?.join(","),
        })) as Array<CurrencySchemaType>;
        queryClient.setQueryData([props.id], currencies);
        const bal = currencies?.reduce((p, c) => p + c.regularMarketPrice, 0);
        setMipCurrentBalance(props.id!, bal);
        let total = 0;
        for (const c of currencies) {
          total += c.regularMarketPrice;
        }
        setCurrentTotalPrice(total);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
    fetchQuotes();
  }, [
    props.currencies,
    props.id,
    queryClient,
    setIsLoading,
    setMipCurrentBalance,
  ]);

  const totalMipAmount: number = props.currencies?.reduce(
    (p, c) => p + c.regularMarketPrice,
    0
  );
  const calculateNetDiff = (): number => {
    return Number((currentTotalPrice - totalMipAmount)?.toFixed(3));
  };
  const netDiff = calculateNetDiff();

  const AvatarTemplate = () => {
    const crypto = props.currencies.find(
      (e) => e.quoteType === "CRYPTOCURRENCY"
    );
    if (crypto?.logoUrl) {
      return <Image src={crypto.logoUrl!} width={40} height={40} alt="Mip" />;
    }
    return <Avatar>{props.currencies?.[0]?.symbol?.[0]}</Avatar>;
  };

  if (!props.currencies?.length) return <></>;

  if (isLoading) {
    return (
      <Card
        sx={{
          p: 2,
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack direction={"row"} gap={2}>
          <Skeleton variant="circular" width={36} height={36} />
          <Stack>
            <Skeleton variant="rectangular" width={40} height={15} />
            <Skeleton
              variant="rectangular"
              width={80}
              height={15}
              sx={{ mt: 1 }}
            />
          </Stack>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Skeleton variant="rectangular" width={80} height={15} />
          <Skeleton variant="rectangular" width={80} height={15} />
        </Stack>
        <Skeleton variant="rectangular" width={80} height={15} />

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Skeleton variant="rectangular" width={80} height={15} />
          <Stack direction={"row"} gap={1}>
            <Skeleton variant="rectangular" width={30} height={15} />
            <Skeleton variant="rectangular" width={30} height={15} />
          </Stack>
        </Stack>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: 2,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <AvatarTemplate />
        <Box>
          <Typography variant="h5">{props.name}</Typography>
          <Typography variant="body1">
            {props.currencies?.length} currencies
          </Typography>
        </Box>
      </Stack>
      <Box>
        <Stack direction={"row"} alignItems={"start"} mt={1}>
          <Box>
            <Typography variant="h4" gutterBottom>
              ${currentTotalPrice?.toFixed(3)}
            </Typography>
            <Typography variant="body1">
              ${totalMipAmount?.toFixed(3)}
            </Typography>
          </Box>

          <Box ml="auto" display={"flex"} alignItems={"center"} mb={1}>
            {<ProgressIcon netDiff={netDiff} />}
            <Typography variant="h6" color={getProgressColor(netDiff)}>
              ${Math.abs(netDiff)?.toLocaleString?.()}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"end"}
        >
          <Typography variant="body2">
            {new Date(props.createdDate!).toLocaleString("US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>

          <Stack direction={"row"}>
            <Tooltip title="View Holdings">
              <IconButton onClick={props.onClick}>
                <AccountBalanceWalletIcon />
              </IconButton>
            </Tooltip>

            <IconButton onClick={() => props.onDelete?.(props)}>
              <DeleteOutlineOutlined color="error" fontSize="medium" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export { MipDetails };
