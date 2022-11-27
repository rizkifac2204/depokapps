import Head from "next/head";
import config from "configs/config";

import { useRouter } from "next/router";
import { Box, Button, Container, Typography, Grid } from "@mui/material";

import MinimalLayout from "components/Layout/MinimalLayout";

function Error() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`Not Found - ${config.appName}`}</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">
                Halaman Yang Anda Tuju Tidak Ditemukan
              </Typography>
              {/* <Link href="/"> */}
              <Button variant="contained" onClick={() => router.back()}>
                Kembali Ke Halaman Sebelumnya
              </Button>
              {/* </Link> */}
            </Grid>
            <Grid item xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Error.Layout = MinimalLayout;

export default Error;
