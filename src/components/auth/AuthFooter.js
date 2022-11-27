// material-ui
import { Link, Typography, Stack } from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://kotadepok.bawaslu.go.id/"
      target="_blank"
      underline="hover"
    >
      Bawaslu Kota Depok
    </Typography>
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://loremit.com/"
      target="_blank"
      underline="hover"
    >
      &copy; By Rizki Fahruroji
    </Typography>
  </Stack>
);

export default AuthFooter;
