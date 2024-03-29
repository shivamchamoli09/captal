import { EmailSvg } from "@/static/svgs/form/email";
import { UserSvg } from "@/static/svgs/form/user";
import {
  Box,
  Button,
  Card,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const containerStyles = {
  background:
    "radial-gradient(164.42% 139.2% at 0% 3.17%, rgba(0, 150, 255, 0.32) 0%, rgba(255, 222, 106, 0.26) 100%)",
  borderRadius: "50px",
  p: 4,
};

const FeedBackForm: React.FC = () => {
  return (
    <Box sx={containerStyles}>
      <Stack
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
      >
        <Typography variant="h2" gutterBottom>
          Suggestion Box
        </Typography>
        <Typography variant="body1" fontWeight={"normal"}>
          {
            "Unlocking Innovation: Your Feedback Shapes Our Future! 🚀 Share your thoughts on how we can soar even higher and craft the features you crave. Together, let's sculpt the next chapter of excellence!"
          }
        </Typography>
      </Stack>

      <Card sx={{ p: 2, mt: 2 }}>
        <Stack display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
            <InputLabel>Name</InputLabel>
            <TextField
              variant="outlined"
              placeholder="Enter you name"
              InputProps={{
                startAdornment: <UserSvg />,
                sx: { gap: 1 },
              }}
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
            <InputLabel>Email</InputLabel>
            <TextField
              variant="outlined"
              placeholder="Enter you email"
              InputProps={{
                startAdornment: <EmailSvg />,
                sx: { gap: 1 },
              }}
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
            <TextField
              variant="outlined"
              rows={10}
              multiline={true}
              placeholder="Here goes your suggestions&#x1F44A;..."
            />
          </Box>

          <Button sx={{ ml: "auto", width: "120px" }}>Submit</Button>
        </Stack>
      </Card>
    </Box>
  );
};

export { FeedBackForm };
