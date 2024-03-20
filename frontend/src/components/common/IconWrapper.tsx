import { Box, useTheme } from "@mui/material";
import React from "react";
import { Card } from "../base/Card";

interface IIconWrapper {
  children?: React.ReactNode;
}

const IconWrapper: React.FC<IIconWrapper> = ({ children }) => {
  const theme = useTheme();
  return (
    <Card sx={{ background: theme.palette.background.default }}>
      {children}
    </Card>
  );
};

export { IconWrapper };
