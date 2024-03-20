import { Theme } from "@mui/material";

const commonFontStyle = { letterSpacing: 0.75, lineHeight: "20px" };

export const TypographyThemeProps: Theme["typography"] = {
  fontFamily: "Sans-serif",
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: 26,
    fontWeight: 700,
    ...commonFontStyle,
  },
  h2: { fontSize: 24, fontWeight: 700, ...commonFontStyle },
  h3: { fontSize: 22, fontWeight: 600, ...commonFontStyle },
  h4: { fontSize: 20, fontWeight: 600, ...commonFontStyle },
  h5: { fontSize: 18, fontWeight: 500, ...commonFontStyle },
  h6: { fontSize: 16, fontWeight: 500, ...commonFontStyle },
  body1: { fontSize: 14, fontWeight: 500, ...commonFontStyle },
  body2: { fontSize: 12, fontWeight: 400, ...commonFontStyle },
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
