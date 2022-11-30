import MainCard from "components/Layout/ui-components/cards/MainCard";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import useLoading from "utils/useLoading";
import useArray from "utils/useArray";
import { useEffect } from "react";

function createData(
  id,
  nama,
  tempat_lahir,
  tanggal_lahir,
  tanggal_nikah,
  pekerjaan
) {
  return { id, nama, tempat_lahir, tanggal_lahir, tanggal_nikah, pekerjaan };
}

const rows = [
  createData(
    1,
    "Abu",
    "Depok",
    "22 April 1992",
    "22 April 2022",
    "PNS",
    "keterangnnya"
  ),
  createData(
    2,
    "Abu",
    "Depok",
    "22 April 1992",
    "22 April 2022",
    "PNS",
    "keterangnnya"
  ),
];

export default function Suasi() {
  const { array, set, push, remove, filter, update, clear } = useArray([]);
  const { loading, setLoading, LoadingScreen } = useLoading(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      set(rows);
    }, 1000);
  }, []);

  function handleDelete(id) {
    const ask = confirm("Yakin Hapus Data?");
    if (ask) {
      remove(id);
    }
  }
  return (
    <MainCard
      boxShadow={true}
      title={<Typography>Data Suami/Istri</Typography>}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell align="right">Tempat Lahir</TableCell>
                <TableCell align="right">Tanggal Lahir</TableCell>
                <TableCell align="right">Tanggal Nikah</TableCell>
                <TableCell align="right">Pekerjaan</TableCell>
                <TableCell align="right">Keterangan</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {array.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.tempat_lahir}</TableCell>
                  <TableCell align="right">{row.tanggal_lahir}</TableCell>
                  <TableCell align="right">{row.tanggal_nikah}</TableCell>
                  <TableCell align="right">{row.pekerjaan}</TableCell>
                  <TableCell align="right">{row.keterangan}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </MainCard>
  );
}
