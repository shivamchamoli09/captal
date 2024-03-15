import { ThemeOptions } from "@mui/material";
import { TypographyThemeProps } from "./base/typography";

export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#303030",
    },
    secondary: {
      main: "#424242",
    },
  },
  typography: TypographyThemeProps,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#303030",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
        },
      },
    },
  },
};
