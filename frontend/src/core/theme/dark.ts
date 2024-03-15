import { ThemeOptions } from "@mui/material";
import { TypographyThemeProps } from "./base/typography";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#303030",
    },
    primary: {
      main: "#303030",
    },
    secondary: {
      main: "#424242",
    },
    success: {
      main: "#008000",
    },
    error: {
      main: "#EE4B2B",
    },
    warning: {
      main: "#FFFF00",
    },
  },
  typography: TypographyThemeProps,
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     body: {
    //       backgroundColor: "#303030",
    //     },
    //   },
    // },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1B2028",
          borderRadius: "6px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          border: "1px solid #303030",
        },
      },
    },
  },
};
