import { EstimatedPriceSchemaType } from "@/lib/domains/estimatedPrices";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Card,
  Stack,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { ProgressIcon, getProgressColor } from "../mips/mip.service";
import { Avatar } from "@/core/theme/base/Avatar";

interface IProps {
  data: EstimatedPriceSchemaType;
}

const assetMapperBySymbol: { [key: string]: string } = {
  AAPL: "Apple Inc.",
  TSLA: "Tesla Inc.",
  NVDA: "NVIDIA Corporation",
  MSFT: "Microsoft Corporation",
  GOOG: "Alphabet Inc.",
  META: "Meta Platforms Inc.",
  "RELIANCE.NS": "Reliance Industries Limited",
  "PAYTM.NS": "Paytm",
};

export const PriceEstimationlist = ({ data }: IProps) => {
  const currentPrice = Number(data?.currentPrice);
  const estimatedPrice = Number(data?.estimatedPrice);
  const netDiff = Number((estimatedPrice - currentPrice)?.toFixed(3));

  const formattedEstimatedDate = new Date(
    data?.estimatedDate
  )?.toLocaleDateString("en-US", {
    weekday: "long", // e.g., "Monday"
    // day: "numeric", // e.g., "2"
  });

  return (
    <Card
      sx={{
        p: 2,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}>
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Avatar>{data?.assetName?.[0]}</Avatar>
        <Box>
          <Typography variant="h6">
            {assetMapperBySymbol[data?.assetName] ?? data?.assetName}
          </Typography>
        </Box>
      </Stack>
      <Box>
        <Stack direction={"row"} alignItems={"start"} mt={1}>
          <Box>
            <Typography
              id="current-price-para"
              variant="h4"
              gutterBottom
              sx={{ width: "115px", wordBreak: "break-word" }}>
              $
              {Number(data?.currentPrice)?.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </Typography>
            <div className="flex gap-1">
              <Typography variant="body1">
                $
                {Number(data?.estimatedPrice)?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}{" "}
                {/* <span style={{ fontSize: "11px" }}>
                  for {formattedEstimatedDate}
                </span> */}
              </Typography>
            </div>
          </Box>

          <Box
            ml="auto"
            display={"flex"}
            alignItems={"center"}
            mb={1}
            justifyContent={"end"}>
            {<ProgressIcon netDiff={netDiff} />}
            <Typography
              variant="h6"
              color={getProgressColor(netDiff)}
              sx={{ maxWidth: "85px", wordBreak: "break-word" }}>
              $
              {Math.abs(netDiff)?.toLocaleString?.("en-US", {
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Stack>

        {/* <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"end"}>
          <Typography variant="body2">
            {new Date(props.createdDate!).toLocaleString("US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>

          {!props?.isDummy && (
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
          )}
        </Stack> */}
      </Box>
    </Card>
  );
};
