import { Theme } from "@mui/material";

export const MuicardThemeProps: Theme["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: "#303030",
      },
    },
  },
};
