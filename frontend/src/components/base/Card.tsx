import { Card as MuiCard, CardProps } from "@mui/material";
import React from "react";

interface IMuiCard extends CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<IMuiCard> = ({ children, sx, ...props }) => {
  return (
    <MuiCard sx={{ p: 2, ...sx }} {...props}>
      {children}
    </MuiCard>
  );
};

export { Card };
