import { ThemeOptions } from "@mui/material";
import { TypographyThemeProps } from "./base/typography";

export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#31353F",
      // default: "#303030",
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
    text: {
      primary: "#FFF",
    },
  },
  typography: TypographyThemeProps,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1B2028",
          borderRadius: "15px",
          boxShadow: "4px 4px 33px 0px rgba(0, 0, 0, 0.05)",
          border: "1px solid #31353F",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#FFF",
            fontWeight: 700,
            textDecoration: "underline",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          ".MuiDialogContent-root": {
            paddingTop: "10px",
          },
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0,0,30,0.4)",
        },
        paper: {
          "&.MuiPaper-root": {
            display: "flex",
            gap: "16px",
            padding: "10px",
            borderRadius: "20px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 14,
          letterSpacing: 1,
          color: "#FFF",
          textTransform: "none",
          // background: "#31353F",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ".Mui-focused": {
            color: "#FFF",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: "16px",
        },
        fontSizeMedium: {
          fontSize: "18px",
        },
        fontSizeInherit: {
          fontSize: "20px",
        },
        fontSizeLarge: {
          fontSize: "24px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    },
  },
};
