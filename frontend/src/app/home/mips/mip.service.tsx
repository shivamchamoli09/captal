import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWest from "@mui/icons-material/SouthWest";

export const ProgressIcon = ({ netDiff }: { netDiff: number }) => {
  if (netDiff === 0) return <></>;
  if (netDiff >= 0) return <NorthEastIcon color="success" />;
  else return <SouthWest color="error" />;
};

export const getProgressColor = (netDiff: number) => {
  if (netDiff === 0) return "";
  if (netDiff >= 0) return "success.main";
  else return "error";
};
