import { useState, useEffect } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import EditIcon from "@mui/icons-material/Edit";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function getWindowSize(window) {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function ProfileTabs({ value, handleChange }) {
  const [windowSize, setWindowSize] = useState({});
  useEffect(() => {
    setWindowSize(getWindowSize(window));
    window.addEventListener("resize", () =>
      setWindowSize(getWindowSize(window))
    );
    return () => {
      window.removeEventListener("resize", () =>
        setWindowSize(getWindowSize(window))
      );
    };
  }, []);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={windowSize.innerWidth < 900 ? "scrollable" : "fullWidth"}
        scrollButtons
        allowScrollButtonsMobile
        aria-label="Pengaturan Profile"
      >
        <Tab
          icon={<AccountBoxIcon />}
          iconPosition="start"
          label="Profile"
          {...a11yProps(0)}
        />
        <Tab
          icon={<FamilyRestroomIcon />}
          iconPosition="start"
          label="Data Keluarga"
          {...a11yProps(1)}
        />
        <Tab
          icon={<HistoryEduIcon />}
          iconPosition="start"
          label="Data Riwayat"
          {...a11yProps(2)}
        />
        <Tab
          icon={<EditIcon />}
          iconPosition="start"
          label="Edit Profile"
          {...a11yProps(3)}
        />
        <Tab
          icon={<LockPersonIcon />}
          iconPosition="start"
          label="Edit Password"
          {...a11yProps(4)}
        />
      </Tabs>
    </Box>
  );
}

export default ProfileTabs;
