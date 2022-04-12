import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { DocumentService } from "../services/DocumentService";
import { useParams, Link, useNavigate } from "react-router-dom";

const KonfirmasiUser = () => {
  const { id } = useParams();
  const user = JSON.parse(sessionStorage.getItem("pengguna"));
  // console.log(user);
  const [document, setDocument] = useState([]);
  const navigate = useNavigate();
  console.log(id);
  console.log(user.id_user);

  const borrow = async (e) => {
    e.preventDefault();

    const data = {
      id_dokumen: id,
      id_peminjam: user.id_user,
    };

    await DocumentService.borrowDocument(data);
    navigate("kelola-data/peminjaman");

    try {
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchBuku = async () => {
      const response = await DocumentService.getDocumentById(id);
      const data = response.data;
      setDocument(data[0]);
    };
    fetchBuku();
  }, [id]);
  console.log(document);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Peminjaman
      </Typography>
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        style={{
          color: "#6F8197",
        }}
      >
        Detail Peminjaman
      </Typography>
      <Box
        sx={{
          backgroundColor: "#FDFAFA",
          p: 2,
          pt: 4,
          width: "95%",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          style={{
            color: "#1C375B",
          }}
          gutterBottom
        >
          Nama
        </Typography>
        <Typography variant="h5" fontWeight={400} gutterBottom>
          {user.nama}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={600}
          style={{
            color: "#1C375B",
          }}
          gutterBottom
        >
          Judul Dokumen
        </Typography>
        <Typography variant="h5" fontWeight={400} gutterBottom>
          {document.judul_dokumen}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={600}
          style={{
            color: "#1C375B",
          }}
          gutterBottom
        >
          Kategori Dokumen
        </Typography>
        <Typography variant="h5" fontWeight={400} gutterBottom>
          {document.kategori_dokumen}
        </Typography>
        <Typography
          variant="h6"
          fontWeight={600}
          style={{
            color: "#1C375B",
          }}
          gutterBottom
        >
          PIC Dokumen
        </Typography>
        <Typography variant="h5" fontWeight={400} gutterBottom>
          {document.nama_pic}
        </Typography>
        <Box sx={{ pt: 4, pb: 2, pr: 2 }}>
          <Grid container spacing={4} justifyContent="flex-end">
            <Grid item>
              <Button
                component={Link}
                to={"/kelola-data/dokumen"}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={borrow} variant="contained" color="success">
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default KonfirmasiUser;
