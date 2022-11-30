import Grid from "@mui/material/Grid";

import CardUtama from "./main/CardUtama";
import Umum from "./main/Umum";

export default function ProfileTabData({ profile }) {
  return (
    <Grid container spacing={1} sx={{ pt: 2 }}>
      <Grid item xs={12} md={4}>
        <CardUtama profile={profile} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Umum profile={profile} />
          </Grid>
          <Grid item xs={12}>
            <Umum profile={profile} />
          </Grid>
          <Grid item xs={12}>
            <Umum profile={profile} />
          </Grid>
          <Grid item xs={12}>
            <Umum profile={profile} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
