import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { BookService } from "../services/BookService";
import { useHistory, useParams } from "react-router-dom";

const KonfirmasiUser = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  console.log(id);
  useEffect(() => {
    const fetchBuku = async () => {
      const response = await BookService.getBooksById(id);
      const data = response.data;
      setBooks(data[0]);
      console.log(books);
    };
    fetchBuku();
  }, []);

  return (
    <Box>
      <Typography>{books.judul}</Typography>
    </Box>
  );
};

export default KonfirmasiUser;
