import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Settings } from "./views/Settings/Settings";
import { Minesweeper } from "./views/Minesweeper/Minesweeper";
import { Typography } from "@mui/material";
import { a11yProps, CustomTabPanel } from "./components/Tabpanel/TabPanel";

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h1" textAlign="center">
        Minesweeper
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab data-testid="Settings" label="Settings" {...a11yProps(0)} />
            <Tab data-testid="Play" label="Play" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Settings />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Minesweeper />
        </CustomTabPanel>
      </Box>
    </>
  );
};
