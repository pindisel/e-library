import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DocumentService } from "../services/DocumentService";
import { useHistory, useParams } from "react-router-dom";

const KonfirmasiUser = () => {
  const { id } = useParams();
  const [document, setDocument] = useState([]);
  // console.log(document);

  useEffect(() => {
    const fetchBuku = async () => {
      const response = await DocumentService.getDocumentById(id);
      const data = response.data;
      setDocument(data[0]);
    };
    fetchBuku();
  }, [id]);

  return (
    <Box>
      <Typography>{document.judul_dokumen}</Typography>
    </Box>
  );
};

export default KonfirmasiUser;
