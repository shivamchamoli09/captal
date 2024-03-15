import { Theme } from "@mui/material";

export const TypographyThemeProps: Theme["typography"] = {
  fontFamily: "Poppins",
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: 24,
    fontWeight: 700,
  },
  h2: { fontSize: 22, fontWeight: 700 },
  h3: { fontSize: 20, fontWeight: 600 },
  h4: { fontSize: 18, fontWeight: 600 },
  h5: { fontSize: 16, fontWeight: 500 },
  h6: { fontSize: 14, fontWeight: 400 },
  body1: { fontSize: 14, fontWeight: 500 },
  body2: { fontSize: 12, fontWeight: 400 },
  subtitle1: {},
  subtitle2: {},
  caption: {},
  button: {},
  overline: {},
  htmlFontSize: 0,
  pxToRem: function (px: number): string {
    //TODO
    return String(px);
  },
};
