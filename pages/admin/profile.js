import Head from "next/head";
import config from "configs/config";
import { useState } from "react";

// MUI
import Box from "@mui/material/Box";
import MainCard from "components/Layout/ui-components/cards/MainCard";

// utils dan authcontext
import { useAuthContext } from "context/authContext";
import useFetch from "utils/useFetch";

// components
import ProfileTabs from "components/profile/ProfileTabs";
import ProfileTabData from "components/profile/ProfileTabData";
import ProfileTabKeluarga from "components/profile/ProfileTabKeluarga";
import ProfileTabRiwayat from "components/profile/ProfileTabRiwayat";
import ProfileTabEdit from "components/profile/ProfileTabEdit";
import ProfileTabPassword from "components/profile/ProfileTabPassword";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const { user } = useAuthContext();
  const { data, error, loading, LoadingScreen } = useFetch(`/api/profile`, {});
  const profile = { ...user, ...data };

  // pengaturan tab
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading || !user) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>{`Profile ${user?.name} - ${config.appName}`}</title>
      </Head>
      <MainCard>
        <LoadingScreen />
        <ProfileTabs value={value} handleChange={handleChange} />
        <TabPanel value={value} index={0}>
          <ProfileTabData profile={profile} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProfileTabKeluarga profile={profile} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProfileTabRiwayat profile={profile} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ProfileTabEdit profile={profile} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ProfileTabPassword profile={profile} />
        </TabPanel>
      </MainCard>
    </>
  );
}

export default Profile;
