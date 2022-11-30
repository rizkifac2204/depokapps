import db from "libs/db";
import Handler from "middlewares/Handler";
import bcrypt from "bcryptjs";
import getLogger from "middlewares/getLogger";

export default Handler()
  .get(async (req, res) => {
    try {
      const result = await db
        .select("user.*", "bawaslu.nama_bawaslu", "level.level")
        .from("user")
        .innerJoin("bawaslu", "user.bawaslu_id", "bawaslu.id")
        .innerJoin("level", "user.level_id", "level.id")
        .where("user.id", req.session.user.id)
        .first();

      if (!result) return res.status(404).json({ message: "Tidak Ditemukan" });

      res.json(result);
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.session.user;
      const {
        nama_admin,
        telp_admin,
        email_admin,
        username,
        passwordConfirm,
        // main
        nik,
        agama,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        gelar_depan,
        gelar_belakang,
        status_pegawai,
        jabatan,
        status_nikah,
        golongan_darah,
        hobi,
        keahlian,
        // alamat
        alamat,
        rt,
        rw,
        kode_pos,
        provinsi,
        kabkota,
        kecamatan,
        kelurahan,
        // badan
        tinggi,
        berat,
        ukuran_celana,
        ukuran_baju,
        ukuran_sepatu,
        bentuk_wajah,
        jenis_rambut,
        warna_kulit,
        ciri_khas,
        cacat,
        // nomor
        no_ktp,
        no_karpeg,
        no_bpjs_ketenagakerjaan,
        no_bpjs_kesehatan,
        no_taspen,
        no_karis,
        no_npwp,
        no_kontrak,
      } = req.body;

      const cek = await db("user").where("id", id).first();
      if (!cek)
        return res.status(401).json({ message: "User Tidak Terdeteksi" });

      // jika password tidak sama
      const match = await bcrypt.compare(passwordConfirm, cek.password);

      if (!match)
        return res.status(401).json({ message: "Password Anda Salah" });

      //cek jika ada email yang sama
      const cekEmailSama = await db("user")
        .where("id", "!=", id)
        .andWhere("email_admin", email_admin)
        .first();
      if (cekEmailSama)
        return res.status(401).json({
          message:
            "Email yang anda masukan sudah di pakai user lain, silakan masukan email pengganti",
        });

      return res.status(400).json({ message: "Gagal Proses boss" });

      const proses = await db("user").where("id", id).update({
        nama_admin,
        telp_admin,
        email_admin,
        username,
        updated_at: db.fn.now(),
      });

      // failed
      if (!proses) return res.status(400).json({ message: "Gagal Proses" });

      res.json({ message: "Berhasil Mengubah Data Profile" });
    } catch (error) {
      getLogger.error(error);
      res.status(500).json({ message: "Terjadi Kesalahan..." });
    }
  });
