import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MainCard from "components/Layout/ui-components/cards/MainCard";

export default function Umum({ profile }) {
  return (
    <MainCard boxShadow={true} title={<Typography>Informasi Umum</Typography>}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          item1
        </Grid>
        <Grid item xs={8}>
          : isiitem1
        </Grid>

        <Grid item xs={4}>
          item2
        </Grid>
        <Grid item xs={8}>
          : isiitem2
        </Grid>
      </Grid>
    </MainCard>
  );
}
