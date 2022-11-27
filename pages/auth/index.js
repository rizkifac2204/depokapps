import { useState } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as yup from "yup";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Google from "@mui/icons-material/Google";

// project imports
import { useRizkiContext } from "context";
import MinimalLayout from "components/Layout/MinimalLayout";
import AuthWrapper1 from "components/auth/AuthWrapper1";
import AuthCardWrapper from "components/auth/AuthCardWrapper";
import AuthFooter from "components/auth/AuthFooter";
import Logo from "components/Layout/ui-components/Logo";
import AnimateButton from "components/Layout/ui-components/extended/AnimateButton";
import GoogleSignIn from "components/auth/GoogleSignIn";

const validationSchema = yup.object({
  username: yup.string("Masukan Username").required("Harus Diisi"),
  password: yup.string("Masukan password").required("Password Harus Diisi"),
});

const handleSubmit = (values, setSubmitting) => {
  const toastProses = toast.loading("Tunggu Sebentar...", {
    autoClose: false,
  });
  axios
    .post(`/api/auth/loginCredential`, values)
    .then((res) => {
      toast.update(toastProses, {
        render: `${res.data.message}, Mengalihkan Halaman`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      window.open("/admin", "_self");
    })
    .catch((err) => {
      console.log(err.response);
      const msg = err.response.data.message
        ? err.response.data.message
        : "Terjadi Kesalahan";
      toast.update(toastProses, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    })
    .then(() => {
      setSubmitting(false);
    });
};

function Login() {
  const [init, action] = useRizkiContext();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* Logo  */}
                  <Grid item sx={{ mb: 1 }}>
                    <Link href="/auth">
                      <Logo />
                    </Link>
                  </Grid>
                  {/* Title  */}
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Bawaslu Kota Depok Apps
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      spacing={2}
                    >
                      {/* Google  */}
                      <Grid item xs={12}>
                        <AnimateButton>
                          <GoogleSignIn />
                        </AnimateButton>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Divider
                            sx={{ flexGrow: 1 }}
                            orientation="horizontal"
                          />

                          <Button
                            variant="outlined"
                            sx={{
                              cursor: "unset",
                              py: 0.5,
                              px: 7,
                              borderColor: `${theme.palette.grey[100]} !important`,
                              color: `${theme.palette.grey[900]}!important`,
                              fontWeight: 500,
                              borderRadius: `${init.borderRadius}px`,
                            }}
                            disableRipple
                            disabled
                          >
                            Atau
                          </Button>

                          <Divider
                            sx={{ flexGrow: 1 }}
                            orientation="horizontal"
                          />
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            Username dan Password
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Form  */}
                    <form
                      noValidate
                      autoComplete="off"
                      onSubmit={formik.handleSubmit}
                    >
                      <FormControl
                        fullWidth
                        error={Boolean(
                          formik.touched.username && formik.errors.username
                        )}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-username-login">
                          Username
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-username-login"
                          value={formik.values.username}
                          name="username"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          label="Username"
                          inputProps={{}}
                        />
                        {formik.touched.username && formik.errors.username && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {formik.errors.username}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(
                          formik.touched.password && formik.errors.password
                        )}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-password-login">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password-login"
                          type={showPassword ? "text" : "password"}
                          value={formik.values.password}
                          name="password"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                          inputProps={{}}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-password-login"
                          >
                            {formik.errors.password}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={(event) =>
                                setChecked(event.target.checked)
                              }
                              name="checked"
                              color="primary"
                            />
                          }
                          label="Remember me"
                        />
                        <Typography
                          variant="subtitle1"
                          color="secondary"
                          sx={{ textDecoration: "none", cursor: "pointer" }}
                        >
                          Forgot Password?
                        </Typography>
                      </Stack>
                      {formik.errors.submit && (
                        <Box sx={{ mt: 3 }}>
                          <FormHelperText error>
                            {formik.errors.submit}
                          </FormHelperText>
                        </Box>
                      )}

                      <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                          <Button
                            disableElevation
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                          >
                            Sign in
                          </Button>
                        </AnimateButton>
                      </Box>
                    </form>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}

Login.Layout = MinimalLayout;

export default Login;
