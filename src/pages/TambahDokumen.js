import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Stack,
  Button,
  styled,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DocumentService } from "../services/DocumentService";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadBox = styled(Box)({
  height: 150,
  borderStyle: "solid",
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const TambahDokumen = () => {
  const navigate = useNavigate();
  const [judulDokumen, setJudulDokumen] = useState("");
  const [pic, setPic] = useState(null);
  const [kategori, setKategori] = useState("");
  const [files, setFiles] = useState([]);
  // console.log(files[0]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    accept: ".pdf",
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
    const formData = new FormData();
    formData.append("judul_dokumen", judulDokumen);
    formData.append("id_pic", pic);
    formData.append("kategori_dokumen", kategori);
    formData.append("file", files[0]);

    console.log(Array.from(formData));
    await DocumentService.addDocument(formData);

    const data = {
      judul_dokumen: judulDokumen,
      pic: pic,
      kategori: kategori,
    };

    var dataKosong = [];
    for (const key in data) {
      if (data[key] === null || data[key].match(/^\s*$/) !== null) {
        dataKosong.push(key.charAt(0).toUpperCase() + key.slice(1));
      }
    }

    dataKosong.forEach((UploadBox, index, arr) => {
      if (index !== 0) {
        arr[index] = " " + UploadBox;
      }
    });

    // if (dataKosong.length === 0) {
    //   // await DocumentService.addDocument(data);
    //   // alert(dataKosong + "dokumen berhasil ditambahkan");
    //   // navigate("/kelola-data/dokumen");
    // } else {
    //   alert(dataKosong + " tidak dapat kosong");
    // }

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
            mb: 3,
          }}
        >
          <UploadBox
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            sx={{
              maxWidth: 700,
              p: 2,
            }}
          >
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <>
                <CloudUploadIcon fontSize="large" color="darkBlue" />
                <Typography variant="h6">Upload dokumen anda disini</Typography>
              </>
            ) : (
              <Box>
                <img src={files[0].preview}></img>
              </Box>
            )}
          </UploadBox>
        </Box>
        <Box
          sx={{
            maxWidth: 700,
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Judul Dokumen
          </Typography>
          <TextField
            variant="outlined"
            color="darkBlue"
            size="small"
            fullWidth
            focused
            onChange={(e) => setJudulDokumen(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 700,
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            PIC Dokumen
          </Typography>
          <TextField
            variant="outlined"
            color="darkBlue"
            size="small"
            fullWidth
            focused
            onChange={(e) => setPic(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 700,
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Kategori
          </Typography>
          <RadioGroup
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          >
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                value="rahasia"
                control={<Radio />}
                label="classified"
              />
              <FormControlLabel
                value="tidak rahasia"
                control={<Radio />}
                label="non-classified"
              />
            </Stack>
          </RadioGroup>
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
