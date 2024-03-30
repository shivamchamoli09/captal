import { AvatarProps, Avatar as MuiAvatar } from "@mui/material";
import React from "react";

interface IAvatar extends AvatarProps {}

const DEFAULT_BG_COLORS = [
  "#F06292",
  "#64B5F6",
  "#FFB74D",
  "#BA68C8",
  "#4DB6AC",
  "#9575CD",
  "#AED581",
  "#FF8A65",
  "#81C784",
  "#FFD54F",
];

function getRandomColor(arr: Array<string>) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const Avatar: React.FC<IAvatar> = ({ children, sx, ...props }) => {
  return (
    <MuiAvatar
      sx={{ backgroundColor: getRandomColor(DEFAULT_BG_COLORS), ...sx }}
      {...props}
    >
      {children}
    </MuiAvatar>
  );
};
