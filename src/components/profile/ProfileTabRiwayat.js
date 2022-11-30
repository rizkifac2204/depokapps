import Grid from "@mui/material/Grid";
import Suasi from "./keluarga/Suasi";

export default function ProfileTabRiwayat({ profile }) {
  return (
    <Grid container spacing={2} sx={{ pt: 2 }}>
      <Grid item xs={12}>
        <Suasi />
      </Grid>
      <Grid item xs={12}>
        <Suasi />
      </Grid>
      <Grid item xs={12}>
        <Suasi />
      </Grid>
      <Grid item xs={12}>
        <Suasi />
      </Grid>
    </Grid>
  );
}
