import { Stack, Card, Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";

interface ITopBadPerformer {}

const TopBadPerformer: React.FC<ITopBadPerformer> = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Card
        sx={{
          p: 2,
          gap: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={"/bitcoin.png"} width={60} height={60} alt="BTC" />
        <Box>
          <Typography variant="h5">Top Performer</Typography>
          <Stack direction={"row"} alignItems={"center"} mt={1}>
            <Typography variant="h4">$4200</Typography>

            <Box ml="auto" display={"flex"} alignItems={"center"}>
              <NorthEastIcon color="success" />
              <Typography variant="h6" color={'success.main'}>$42</Typography>
            </Box>
          </Stack>
        </Box>
      </Card>
      <Card
        sx={{
          p: 2,
          gap: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={"/bitcoin.png"} width={60} height={60} alt="BTC" />
        <Box>
          <Typography variant="h5">Low Performer</Typography>
          <Stack direction={"row"} alignItems={"center"} mt={1}>
            <Typography variant="h4">$4200</Typography>

            <Box ml="auto" display={"flex"} alignItems={"center"}>
              <SouthWestIcon color="error" />
              <Typography variant="h6" color={'error.main'}>$42</Typography>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
};

export { TopBadPerformer };
