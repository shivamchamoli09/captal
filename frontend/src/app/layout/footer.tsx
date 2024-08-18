import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1" color="inherit">
        &copy; 2024 Captal Project. All Rights Reserved.
      </Typography>
      {/* <Typography variant="body1" color="inherit">
        Owned by Shivam Chamoli, India.
      </Typography> */}
      {/* <Typography variant="body1" color="inherit">
        <Link href="#" color="inherit" underline="hover">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link href="#" color="inherit" underline="hover">
          Terms of Service
        </Link>
      </Typography> */}
    </Box>
  );
}

export default Footer;
