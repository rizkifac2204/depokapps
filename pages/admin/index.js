import Head from "next/head";
import config from "configs/config";
// material-ui
import { Typography } from "@mui/material";
// project imports
import MainCard from "components/Layout/ui-components/cards/MainCard";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>{`Dashboard - ${config.appName}`}</title>
      </Head>
      <MainCard title="Sample Card">
        <Typography variant="body2">
          Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion
          tempos incident ut laborers et doolie magna alissa. Ut enif ad minim
          venice, quin nostrum exercitation illampu laborings nisi ut liquid ex
          ea commons construal. Duos aube grue dolor in reprehended in voltage
          veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean
          cuspidate non president, sunk in culpa qui officiate descent molls
          anim id est labours.
        </Typography>
      </MainCard>
    </>
  );
};

export default Dashboard;
