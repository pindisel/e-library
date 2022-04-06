import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { DocumentService } from "../services/DocumentService";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const TambahDokumen = () => {
  const navigate = useNavigate();
  const [judulDokumen, setJudulDokumen] = useState("");
  const [idPic, setIdPic] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun, setTahun] = useState("");
  const [files, setFiles] = useState([]);
  console.log(files);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: "image/jpg, image/png, image/jpeg",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      judul_dokumen: judulDokumen,
      // id_pic: idPic,
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
      await DocumentService.addDocument(data);
      alert(dataKosong + "dokumen berhasil ditambahkan");
      navigate("/kelola-data/dokumen");
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
        <Typography variant="h4" fontWeight={600}>
          Tambah Dokumen
        </Typography>
        <Box
          sx={{
            maxWidth: 700,
            m: 2,
          }}
        >
          <Typography>Judul Dokumen</Typography>
          <TextField
            fullWidth
            required
            value={judulDokumen}
            onChange={(e) => setJudulDokumen(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 700,
            m: 2,
          }}
        >
          <Typography>Pengarang</Typography>
          <TextField
            fullWidth
            required
            value={pengarang}
            onChange={(e) => setPengarang(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 700,
            m: 2,
          }}
        >
          <Typography>Penerbit</Typography>
          <TextField
            fullWidth
            required
            value={penerbit}
            onChange={(e) => setPenerbit(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 700,
            m: 2,
          }}
        >
          <Typography>Tahun</Typography>
          <TextField
            fullWidth
            required
            value={tahun}
            onChange={(e) => setTahun(e.target.value.toString())}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 700,
            m: 2,
          }}
        >
          <Typography>Upload Dokumen</Typography>
          <Box
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            sx={{
              maxWidth: 700,
              p: 2,
            }}
          >
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <>
                {/* <UploadIcon /> */}
                <Typography>Klik untuk menjelajahi dokumen anda</Typography>
              </>
            ) : (
              <Box>
                <img src={files[0].preview}></img>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            maxWidth: 700,
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
