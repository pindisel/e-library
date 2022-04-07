import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DocumentService } from "../services/DocumentService";
import { useHistory, useParams } from "react-router-dom";

const KonfirmasiUser = () => {
  const { id } = useParams();
  const user = JSON.parse(sessionStorage.getItem("pengguna"));
  // console.log(user);
  const [document, setDocument] = useState([]);
  console.log(id);
  console.log(user.id_user);

  const borrow = async (e) => {
    e.preventDefault();

    const data = {
      id_dokumen: id,
      id_peminjam: user.id_user,
    };

    await DocumentService.borrowDocument(data);
    console.log(data);

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

  return (
    <>
      <Box>
        <Typography>{document.judul_dokumen}</Typography>
        <Button onClick={borrow} variant="contained" color="success">
          Add
        </Button>
      </Box>
    </>
  );
};

export default KonfirmasiUser;
