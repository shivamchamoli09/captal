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
      dark: "rgb(4 119 199 / 32%)",
      //rgb(8 99 162 / 32%)
      // "radial-gradient(164.42% 139.2% at 0% 3.17%, rgb(4 119 199 / 32%) 0%, rgba(255, 222, 106, 0.26) 100%)",
    },
    secondary: {
      main: "#424242",
    },
    success: {
      main: "#008000",
      light: "rgb(4 119 199 / 32%)",
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "whitesmoke",
          ":hover": {
            textDecoration: "underline",
          },
        },
      },
    },
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
          textTransform: "capitalize",
          letterSpacing: "1px",
          ":hover *": {
            borderRadius: "10px",
          },
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
            maxWidth: "650px",
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
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiFormLabel-root-MuiInputLabel-root .Mui-focused": {
            color: "#FFF!important",
          },
          ".MuiFormLabel-root": {
            color: "#FFF!important",
          },
          ".MuiOutlinedInput-notchedOutline": { borderColor: "#FFF!important" },
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
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: "36px",
          height: "36px",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          ".MuiButton-contained": {
            background: "#0f5940",
          },
          ".MuiButtonBase-root": {
            borderColor: "#FFF",
          },
        },
      },
    },
    // MuiSkeleton: {
    //   styleOverrides: {
    //     root: {
    //       ".MuiSkeleton-rectangular": { borderRadius: "6px" },
    //     },
    //   },
    // },
  },
};
