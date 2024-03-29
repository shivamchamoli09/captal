import React, { useEffect } from "react";
import Tab, { TabProps } from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Button } from "@mui/material";

interface ITab extends Omit<TabProps, "tabs" | "value" | "onChange"> {
  tabs?: Array<string | number>;
  value?: string | number;
  onChange?: (val: string | number) => void;
}

const Tabs: React.FC<ITab> = (props) => {
  const [value, setValue] = React.useState<typeof props.value>();

  useEffect(() => {
    setValue(props.value ?? props?.tabs?.[0]);
  }, [props.tabs, props.value]);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: typeof value
  ) => {
    props?.onChange?.(newValue!);
    setValue(newValue);
  };

  return (
    <TabContext value={props.value!}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="tabs">
          {props?.tabs?.map((val) => (
            <Tab
              sx={{ p: 0, height: "40px", width: "80px" }}
              key={val}
              value={val}
              label={val}
            />
          ))}
        </TabList>
      </Box>
    </TabContext>
  );
};

export { Tabs };
