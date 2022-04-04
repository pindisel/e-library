import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { BookService } from "../services/BookService";

const TambahDokumen = () => {
  const [judul, setJudul] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun, setTahun] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      judul: judul,
      pengarang: pengarang,
      penerbit: penerbit,
      tahun: tahun,
    };
    var dataKosong = [];
    for (const key in data) {
      if (data[key] === null || data[key].match(/^\s*$/) !== null) {
        dataKosong.push(key.charAt(0).toUpperCase() + key.slice(1));
      }
    }

    dataKosong.forEach((item, index, arr) => {
      if (index !== 0) {
        arr[index] = " " + item;
      }
    });

    if (dataKosong.length === 0) {
      await BookService.addBooks(data);
      alert(dataKosong + "dokumen berhasil ditambahkan");
      window.location = "/tambah-dokumen";
    } else {
      alert(dataKosong + " tidak dapat kosong");
    }

    try {
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          ml: 10,
          pt: 10,
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Typography variant="h4">Tambah Dokumen</Typography>
        <Typography
          sx={{
            width: 500,
            maxWidth: "100%",
            mt: 1,
            mb: 5,
          }}
        >
          Tambah anggota
        </Typography>

        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Judul</Typography>
          <TextField
            fullWidth
            id="fullWidth"
            required
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Pengarang</Typography>
          <TextField
            fullWidth
            id="fullWidth"
            required
            value={pengarang}
            onChange={(e) => setPengarang(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Penerbit</Typography>
          <TextField
            fullWidth
            id="fullWidth"
            required
            value={penerbit}
            onChange={(e) => setPenerbit(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Tahun</Typography>
          <TextField
            fullWidth
            id="fullWidth"
            required
            value={tahun}
            onChange={(e) => setTahun(e.target.value.toString())}
          />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
            mt: 7,
            pl: 69,
          }}
        >
          <Stack direction="row" spacing={2}>
            {" "}
            <Button variant="contained" color="error">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              Add
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default TambahDokumen;