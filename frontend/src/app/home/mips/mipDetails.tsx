import { Card, Box, Typography, Stack, IconButton } from "@mui/material";
import React from "react";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { IconWrapper } from "@/components/common/IconWrapper";
import { MipSchemaType } from "@/lib/domains/mipSchema";
import { DeleteForever, DeleteOutlineOutlined } from "@mui/icons-material";

interface IMipDetails extends MipSchemaType {
  onDelete?: (item: MipSchemaType) => void;
  onClick?: () => void;
}

const MipDetails: React.FC<IMipDetails> = (props) => {
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
        <IconWrapper>
          <Image
            src={props.currencies[0].image!}
            width={40}
            height={40}
            alt="BTC"
          />
        </IconWrapper>

        <Box>
          <Typography variant="h5" onClick={props.onClick}>
            {props.name}
          </Typography>
          <Typography variant="body1">
            {props.currencies?.length} currencies
          </Typography>
        </Box>
      </Stack>
      <Box>
        <Stack direction={"row"} alignItems={"center"} mt={1}>
          <Typography variant="h4">
            $
            {props.currencies
              ?.reduce((p, c) => p + c.current_price, 0)
              ?.toFixed(3)}
          </Typography>

          <Box ml="auto" display={"flex"} alignItems={"center"} mb={1}>
            <NorthEastIcon color="success" />
            <Typography variant="h6" color={"success.main"}>
              $42
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

          <IconButton onClick={() => props.onDelete?.(props)}>
            <DeleteOutlineOutlined color="error" fontSize="medium" />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};

export { MipDetails };
