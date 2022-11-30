import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// utils
import useFetch from "utils/useFetch";
import { useState, useEffect } from "react";

const handleSubmit = (values, setSubmitting) => {
  const toastProses = toast.loading("Tunggu Sebentar...", { autoClose: false });
  axios
    .put(`/api/profile`, values)
    .then((res) => {
      toast.update(toastProses, {
        render: res.data.message,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      let tempMassage = "Gagal Proses";
      if (err.response.status == 404) {
        tempMassage =
          "Mohon Maaf, Hilangkan atau ganti spesial karakter pada inputan anda";
      }
      const msg = err.response.data.message
        ? err.response.data.message
        : tempMassage;
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

const validationSchema = yup.object({
  // admin
  nama_admin: yup.string().required("Harus Diisi"),
  email_admin: yup
    .string("Masukan Email")
    .email("Email Tidak Valid")
    .required("Email Harus Diisi"),
  telp_admin: yup.string().required("Harus Diisi"),

  // main umum
  nik: yup.string().required("Harus Diisi"),
  status_pegawai: yup.string().required("Harus Diisi"),
  jabatan: yup.string().required("Harus Diisi"),
  jenis_kelamin: yup.string().required("Harus Diisi"),
  agama: yup.string().required("Harus Diisi"),
  tempat_lahir: yup.string().required("Harus Diisi"),
  tanggal_lahir: yup.string().required("Harus Diisi"),
  status_nikah: yup.string().required("Harus Diisi"),

  // main alamat
  alamat: yup.string().required("Harus Diisi"),
  rt: yup.string().required("Harus Diisi"),
  rw: yup.string().required("Harus Diisi"),
  provinsi: yup.string().required("Provinsi Harus Dipilih"),
  kabkota: yup.string().required("Kabupaten/Kota Harus Dipilih"),
  kecamatan: yup.string().required("Kecamatan Harus Dipilih"),
  kelurahan: yup.string().required("Kelurahan Harus Dipilih"),
  kode_pos: yup.string().required("Kode Pos Harus Dipilih"),

  username: yup.string().required("Username Harus Diisi"),
  passwordConfirm: yup.string().required("Password Harus Diisi"),
});

function ProfileTabEdit({ profile }) {
  const [showPassword, setShowPassword] = useState(false);
  const { data: main } = useFetch(`/api/profile/main`);
  const { data: badan } = useFetch(`/api/profile/badan`);
  const { data: nomor } = useFetch(`/api/profile/nomor`);
  // utils
  const { data: statuspegawai } = useFetch(
    `/api/services/utils/status-pegawai`
  );
  const { data: jabatan } = useFetch(`/api/services/utils/jabatan`);
  const { data: agama } = useFetch(`/api/services/utils/agama`);
  const { data: nikah } = useFetch(`/api/services/utils/pernikahan`);
  const { data: rambut } = useFetch(`/api/services/utils/rambut`);
  const { data: kulit } = useFetch(`/api/services/utils/kulit`);
  const { data: wajah } = useFetch(`/api/services/utils/bentuk-wajah`);

  const { data: provinsi } = useFetch(`/api/services/provinsi`);
  const { data: kabkota, refetch: refetchKabkota } = useFetch(undefined);
  const { data: kecamatan, refetch: refetchKecamatan } = useFetch(undefined);
  const { data: kelurahan, refetch: refetchKelurahan } = useFetch(undefined);

  // const main = {};
  // const badan = {};
  // const nomor = {};

  // const provinsi = [];
  // const kabkota = [];
  // const kecamatan = [];
  // const kelurahan = [];

  // const statuspegawai = [];
  // const jabatan = [];
  // const agama = [];
  // const nikah = [];
  // const rambut = [];
  // const kulit = [];
  // const wajah = [];

  const formik = useFormik({
    initialValues: {
      // user
      nama_admin: profile?.nama_admin || "",
      telp_admin: profile?.telp_admin || "",
      email_admin: profile?.email_admin || "",
      username: profile?.username || "",
      passwordConfirm: "",

      // main umum
      nik: main?.nik || "",
      status_pegawai: main?.status_pegawai || "",
      jabatan: main?.jabatan || "",
      agama: main?.agama || "",
      jenis_kelamin: main?.jenis_kelamin || "",
      tempat_lahir: main?.tempat_lahir || "",
      tanggal_lahir: main?.tanggal_lahir || "",
      golongan_darah: main?.golongan_darah || "",
      status_nikah: main?.status_nikah || "",
      gelar_depan: main?.gelar_depan || "",
      gelar_belakang: main?.gelar_belakang || "",
      hobi: main?.hobi || "",
      keahlian: main?.keahlian || "",
      // main alamat
      alamat: main?.alamat || "",
      rt: main?.rt || "",
      rw: main?.rw || "",
      kode_pos: main?.kode_pos || "",
      provinsi: main?.provinsi || "",
      kabkota: main?.kabkota || "",
      kecamatan: main?.kecamatan || "",
      kelurahan: main?.kelurahan || "",

      // badan
      tinggi: badan?.tinggi || "",
      berat: badan?.berat || "",
      ukuran_celana: badan?.ukuran_celana || "",
      ukuran_baju: badan?.ukuran_baju || "",
      ukuran_sepatu: badan?.ukuran_sepatu || "",
      jenis_rambut: badan?.jenis_rambut || "",
      bentuk_wajah: badan?.bentuk_wajah || "",
      warna_kulit: badan?.warna_kulit || "",
      ciri_khas: badan?.ciri_khas || "",
      cacat: badan?.cacat || "",

      // nomor
      no_ktp: nomor?.no_ktp || "",
      no_karpeg: nomor?.no_karpeg || "",
      no_bpjs_ketenagakerjaan: nomor?.no_bpjs_ketenagakerjaan || "",
      no_bpjs_kesehatan: nomor?.no_bpjs_kesehatan || "",
      no_taspen: nomor?.no_taspen || "",
      no_karis: nomor?.no_karis || "",
      no_npwp: nomor?.no_npwp || "",
      no_kontrak: nomor?.no_kontrak || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, setSubmitting),
  });

  useEffect(() => {
    if (formik.isSubmitting) {
      const el = document.querySelector(".Mui-error, [data-error]");
      (el?.parentElement ?? el)?.scrollIntoView();
    }
  }, [formik.isSubmitting]);

  const [selectedProvinsi, setSelectedProvinsi] = useState(``);
  const [selectedKabkota, setSelectedKabkota] = useState(``);
  const [selectedKecamatan, setSelectedKecamatan] = useState(``);
  const [selectedKelurahan, setSelectedKelurahan] = useState(``);

  const [touchedProvinsi, setTouchedProvinsi] = useState(false);
  const [touchedKabkota, setTouchedKabkota] = useState(false);
  const [touchedKecamatan, setTouchedKecamatan] = useState(false);
  const [touchedKelurahan, setTouchedKelurahan] = useState(false);

  function handleChangeProvinsi(id = null) {
    refetchKabkota(`/api/services/provinsi/${id || undefined}/kabkota`);
    if (id) {
      let newData = provinsi.find((i) => i.id == id);
      setSelectedProvinsi((prev) => id);
      formik.setFieldValue("provinsi", newData.provinsi);
    } else {
      setSelectedProvinsi(``);
      formik.setFieldValue("provinsi", "");
    }

    // reset
    setSelectedKabkota(``);
    setSelectedKecamatan(``);
    setSelectedKelurahan(``);

    // reset formik
    formik.setFieldValue("kabkota", "");
    formik.setFieldValue("kecamatan", "");
    formik.setFieldValue("kelurahan", "");
  }

  function handleChangeKabkota(id = null) {
    refetchKecamatan(
      `/api/services/provinsi/${selectedProvinsi}/kabkota/${
        id || undefined
      }/kecamatan`
    );
    if (id) {
      let newData = kabkota.find((i) => i.id == id);
      setSelectedKabkota((prev) => id);
      formik.setFieldValue("kabkota", newData.kabkota);
    } else {
      setSelectedKabkota(``);
      formik.setFieldValue("kabkota", "");
    }
    // reset
    setSelectedKecamatan(``);
    setSelectedKelurahan(``);

    // reset formik
    formik.setFieldValue("kecamatan", "");
    formik.setFieldValue("kelurahan", "");
  }

  function handleChangeKecamatan(id = null) {
    refetchKelurahan(
      `/api/services/provinsi/${selectedProvinsi}/kabkota/${selectedKabkota}/kecamatan/${
        id || undefined
      }/kelurahan`
    );
    if (id) {
      let newData = kecamatan.find((i) => i.id == id);
      setSelectedKecamatan((prev) => id);
      formik.setFieldValue("kecamatan", newData.kecamatan);
    } else {
      setSelectedKecamatan(``);
      formik.setFieldValue("kecamatan", "");
    }
    // reset
    setSelectedKelurahan(``);

    // reset formik
    formik.setFieldValue("kelurahan", "");
  }

  function handleChangeKelurahan(id = null) {
    let newData = kelurahan.find((i) => i.id == id);
    if (id) {
      setSelectedKelurahan((prev) => id);
      formik.setFieldValue("kelurahan", newData.kelurahan);
    } else {
      setSelectedKelurahan(``);
      formik.setFieldValue("kelurahan", "");
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                Informasi Umum
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* nik  */}
              <TextField
                required
                fullWidth
                size="small"
                margin="normal"
                label="NIK / NIP"
                name="nik"
                value={formik.values.nik}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nik && Boolean(formik.errors.nik)}
                helperText={formik.touched.nik && formik.errors.nik}
              />

              {/* nama  */}
              <TextField
                required
                fullWidth
                size="small"
                margin="normal"
                label="Nama Lengkap"
                name="nama_admin"
                value={formik.values.nama_admin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nama_admin && Boolean(formik.errors.nama_admin)
                }
                helperText={
                  formik.touched.nama_admin && formik.errors.nama_admin
                }
              />

              {/* telp  */}
              <TextField
                required
                fullWidth
                size="small"
                margin="normal"
                label="Telp / HP"
                name="telp_admin"
                value={formik.values.telp_admin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.telp_admin && Boolean(formik.errors.telp_admin)
                }
                helperText={
                  formik.touched.telp_admin && formik.errors.telp_admin
                }
              />

              {/* email  */}
              <TextField
                required
                fullWidth
                size="small"
                margin="normal"
                type="email"
                label="Email"
                name="email_admin"
                value={formik.values.email_admin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.email_admin &&
                  Boolean(formik.errors.email_admin)
                }
                helperText={
                  formik.touched.email_admin && formik.errors.email_admin
                }
              />

              {/* Agama  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={formik.touched.agama && Boolean(formik.errors.agama)}
              >
                <InputLabel>Agama *</InputLabel>
                <Select
                  name="agama"
                  value={formik.values.agama}
                  label="Agama *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {agama &&
                    agama.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.agama}>
                          {item.agama}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText>
                  {formik.touched.agama && formik.errors.agama}
                </FormHelperText>
              </FormControl>

              {/* Jenis Kelamin  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={
                  formik.touched.jenis_kelamin &&
                  Boolean(formik.errors.jenis_kelamin)
                }
              >
                <InputLabel>Jenis Kelamin *</InputLabel>
                <Select
                  name="jenis_kelamin"
                  value={formik.values.jenis_kelamin}
                  label="Jenis Kelamin *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  <MenuItem value={`Laki-Laki`}>Laki-Laki</MenuItem>
                  <MenuItem value={`Perempuan`}>Perempuan</MenuItem>
                </Select>
                <FormHelperText>
                  {formik.touched.jenis_kelamin && formik.errors.jenis_kelamin}
                </FormHelperText>
              </FormControl>

              {/* tempat lahir  */}
              <TextField
                required
                fullWidth
                size="small"
                margin="normal"
                label="Tempat Lahir"
                name="tempat_lahir"
                value={formik.values.tempat_lahir}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.tempat_lahir &&
                  Boolean(formik.errors.tempat_lahir)
                }
                helperText={
                  formik.touched.tempat_lahir && formik.errors.tempat_lahir
                }
              />

              {/* tanggal lahir  */}
              <TextField
                required
                fullWidth
                size="small"
                type={"date"}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                label="Tanggal Lahir"
                name="tanggal_lahir"
                value={formik.values.tanggal_lahir}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.tanggal_lahir &&
                  Boolean(formik.errors.tanggal_lahir)
                }
                helperText={
                  formik.touched.tanggal_lahir && formik.errors.tanggal_lahir
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* gelar depan  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Gelar Depan"
                name="gelar_depan"
                value={formik.values.gelar_depan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* gelar belakang  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Gelar Belakang"
                name="gelar_belakang"
                value={formik.values.gelar_belakang}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* Status Pegawai  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={
                  formik.touched.status_pegawai &&
                  Boolean(formik.errors.status_pegawai)
                }
              >
                <InputLabel>Status Pegawai *</InputLabel>
                <Select
                  name="status_pegawai"
                  value={formik.values.status_pegawai}
                  label="Status Pegawai *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // renderValue={(value) => `⚠️  - ${value}`}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {statuspegawai &&
                    statuspegawai.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.status_pegawai}>
                          {item.status_pegawai}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText>
                  {formik.touched.status_pegawai &&
                    formik.errors.status_pegawai}
                </FormHelperText>
              </FormControl>

              {/* Jabatan  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={formik.touched.jabatan && Boolean(formik.errors.jabatan)}
              >
                <InputLabel>Jabatan *</InputLabel>
                <Select
                  name="jabatan"
                  value={formik.values.jabatan}
                  label="Jabatan *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {jabatan &&
                    jabatan.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.jabatan}>
                          {item.jabatan}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText>
                  {formik.touched.jabatan && formik.errors.jabatan}
                </FormHelperText>
              </FormControl>

              {/* Nikah  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={
                  formik.touched.status_nikah &&
                  Boolean(formik.errors.status_nikah)
                }
              >
                <InputLabel>Status Pernikahan *</InputLabel>
                <Select
                  name="status_nikah"
                  value={formik.values.status_nikah}
                  label="Status Pernikahan *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {nikah &&
                    nikah.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.pernikahan}>
                          {item.pernikahan}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText>
                  {formik.touched.status_nikah && formik.errors.status_nikah}
                </FormHelperText>
              </FormControl>

              {/* Darah  */}
              <FormControl fullWidth sx={{ mt: 2 }} size="small">
                <InputLabel>Golongan Darah</InputLabel>
                <Select
                  name="golongan_darah"
                  value={formik.values.golongan_darah}
                  label="Golongan Darah"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                </Select>
              </FormControl>

              {/* Hobi  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Hoby"
                name="hobi"
                value={formik.values.hobi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* Keahlian  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Keahlian"
                name="keahlian"
                value={formik.values.keahlian}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                Alamat
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Alamat  */}
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                size="small"
                margin="normal"
                label="Alamat"
                name="alamat"
                value={formik.values.alamat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.alamat && Boolean(formik.errors.alamat)}
                helperText={formik.touched.alamat && formik.errors.alamat}
              />

              {/* RT  */}
              <TextField
                required
                size="small"
                margin="normal"
                label="RT"
                name="rt"
                value={formik.values.rt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rt && Boolean(formik.errors.rt)}
                helperText={formik.touched.rt && formik.errors.rt}
                sx={{ mr: 3 }}
              />

              {/* RW  */}
              <TextField
                required
                size="small"
                margin="normal"
                label="RW"
                name="rw"
                value={formik.values.rw}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rw && Boolean(formik.errors.rw)}
                helperText={formik.touched.rw && formik.errors.rw}
              />

              {/* Kode Pos  */}
              <TextField
                required
                fullWidth
                size="small"
                margin="normal"
                label="Kode Pos"
                name="kode_pos"
                value={formik.values.kode_pos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.kode_pos && Boolean(formik.errors.kode_pos)
                }
                helperText={formik.touched.kode_pos && formik.errors.kode_pos}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Provinsi  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={touchedProvinsi && selectedProvinsi.length === 0}
              >
                <InputLabel>Provinsi *</InputLabel>
                <Select
                  name="selectedProvinsi"
                  defaultValue=""
                  value={selectedProvinsi || ""}
                  label="Provinsi *"
                  onClick={() => setTouchedProvinsi(true)}
                  onChange={(e) => handleChangeProvinsi(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {provinsi.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.provinsi}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  {touchedProvinsi && selectedProvinsi.length === 0
                    ? "Harus Dipilih"
                    : null}
                </FormHelperText>
              </FormControl>

              {/* Kabkota  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={touchedKabkota && selectedKabkota.length === 0}
              >
                <InputLabel>Kabupaten/Kota *</InputLabel>
                <Select
                  name="selectedKabkota"
                  defaultValue=""
                  value={selectedKabkota || ""}
                  label="Kabupaten/Kota *"
                  onClick={() => setTouchedKabkota(true)}
                  onChange={(e) => handleChangeKabkota(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {kabkota.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.kabkota}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  {touchedKabkota && selectedKabkota.length === 0
                    ? "Harus Dipilih"
                    : null}
                </FormHelperText>
              </FormControl>

              {/* Kecamatan  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={touchedKecamatan && selectedKecamatan.length === 0}
              >
                <InputLabel>Kecamatan *</InputLabel>
                <Select
                  name="selectedKecamatan"
                  defaultValue=""
                  value={selectedKecamatan || ""}
                  label="Kecamatan *"
                  onClick={() => setTouchedKecamatan(true)}
                  onChange={(e) => handleChangeKecamatan(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {kecamatan.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.kecamatan}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  {touchedKecamatan && selectedKecamatan.length === 0
                    ? "Harus Dipilih"
                    : null}
                </FormHelperText>
              </FormControl>

              {/* Kelurahan  */}
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                error={touchedKelurahan && selectedKelurahan.length === 0}
              >
                <InputLabel>Kelurahan *</InputLabel>
                <Select
                  name="selectedKelurahan"
                  defaultValue=""
                  value={selectedKelurahan || ""}
                  label="Kelurahan *"
                  onClick={() => setTouchedKelurahan(true)}
                  onChange={(e) => handleChangeKelurahan(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {kelurahan.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.kelurahan}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  {touchedKelurahan && selectedKelurahan.length === 0
                    ? "Harus Dipilih"
                    : null}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ mt: 2 }}>
                Keterangan Badan
              </Typography>
              <Divider />

              {/* Tinggi Badan  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Tinggi Badan"
                name="tinggi"
                value={formik.values.tinggi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* Berat Badan  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Berat Badan"
                name="berat"
                value={formik.values.berat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* Ukuran Celana  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Ukuran Celana"
                name="ukuran_celana"
                value={formik.values.ukuran_celana}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* Ukuran Baju  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Ukuran Baju"
                name="ukuran_baju"
                value={formik.values.ukuran_baju}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* Ukuran Sepatu  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Ukuran Sepatu"
                name="ukuran_sepatu"
                value={formik.values.ukuran_sepatu}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* bentuk_wajah */}
              <FormControl fullWidth sx={{ mt: 2 }} size="small">
                <InputLabel>Bentuk Wajah</InputLabel>
                <Select
                  name="bentuk_wajah"
                  value={formik.values.bentuk_wajah}
                  label="Bentuk Wajah"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {wajah &&
                    wajah.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.bentuk}>
                          {item.bentuk}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              {/* Jenis Rambut  */}
              <FormControl fullWidth sx={{ mt: 2 }} size="small">
                <InputLabel>Jenis Rambut</InputLabel>
                <Select
                  name="jenis_rambut"
                  value={formik.values.jenis_rambut}
                  label="Jenis Rambut"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // renderValue={(value) => `⚠️  - ${value}`}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {rambut &&
                    rambut.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.rambut}>
                          {item.rambut}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              {/* warna_kulit  */}
              <FormControl fullWidth sx={{ mt: 2 }} size="small">
                <InputLabel>Warna Kulit</InputLabel>
                <Select
                  name="warna_kulit"
                  value={formik.values.warna_kulit}
                  label="Warna Kulit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Pilih</em>
                  </MenuItem>
                  {kulit &&
                    kulit.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.kulit}>
                          {item.kulit}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              {/* ciri khas  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Ciri Khas"
                name="ciri_khas"
                value={formik.values.ciri_khas}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* cacat tubuh  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Cacat Tubuh"
                name="cacat"
                value={formik.values.cacat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ mt: 2 }}>
                Lainnya
              </Typography>
              <Divider />

              {/* KTP  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. KTP"
                name="no_ktp"
                value={formik.values.no_ktp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* KARPEG  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. KARPEG"
                name="no_karpeg"
                value={formik.values.no_karpeg}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* no_bpjs_ketenagakerjaan  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. BPJS Ketenaga Kerjaan"
                name="no_bpjs_ketenagakerjaan"
                value={formik.values.no_bpjs_ketenagakerjaan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* no_bpjs_kesehatan  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. BPJS Kesehatan"
                name="no_bpjs_kesehatan"
                value={formik.values.no_bpjs_kesehatan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* no_taspen  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. TASPEN"
                name="no_taspen"
                value={formik.values.no_taspen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* no_karis  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. KARIS"
                name="no_karis"
                value={formik.values.no_karis}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* no_npwp  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. NPWP"
                name="no_npwp"
                value={formik.values.no_npwp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {/* no_kontrak  */}
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="No. KONTRAK"
                name="no_kontrak"
                value={formik.values.no_kontrak}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* username  */}
              <TextField
                required
                fullWidth
                size="small"
                margin="normal"
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* password */}
              <FormControl
                fullWidth
                size="small"
                sx={{ mt: 2 }}
                error={
                  formik.touched.passwordConfirm &&
                  Boolean(formik.errors.passwordConfirm)
                }
              >
                <InputLabel htmlFor="passwordConfirm">
                  Password Lama *
                </InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  label="Password Lama"
                  id="passwordConfirm"
                  type={showPassword ? "text" : "password"}
                  name="passwordConfirm"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? (
                          <VisibilityIcon fontSize="inherit" />
                        ) : (
                          <VisibilityOffIcon fontSize="inherit" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  {formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={formik.isSubmitting}
                type="submit"
                variant="contained"
                endIcon={<EditIcon />}
              >
                Update
              </Button>

              <Button
                variant="contained"
                endIcon={<RestartAltIcon />}
                sx={{ ml: 3 }}
                color="warning"
                onClick={() => {
                  console.log("reset");
                }}
              >
                Reset
              </Button>
            </Grid>

            {JSON.stringify(formik.errors)}
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProfileTabEdit;
