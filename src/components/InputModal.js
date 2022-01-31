import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { BookService } from "../services/BookService";

const InputModal = ({ openInput, handleCloseInput }) => {
  const [judul, setJudul] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun, setTahun] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await BookService.addBooks({
      judul: judul,
      pengarang: pengarang,
      penerbit: penerbit,
      tahun: tahun,
    });
    window.location = "/kelola-data";
    handleCloseInput();
  };

  const ModalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };
  return (
    <>
      <Modal
        open={openInput}
        onClose={handleCloseInput}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={ModalBoxStyle}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            label="Judul"
            variant="outlined"
            sx={{ mr: 2 }}
            required
            onChange={(e) => setJudul(e.target.value)}
          />
          <TextField
            label="Pengarang"
            variant="outlined"
            sx={{ mr: 2 }}
            required
            onChange={(e) => setPengarang(e.target.value)}
          />
          <TextField
            label="Penerbit"
            variant="outlined"
            sx={{ mr: 2 }}
            required
            onChange={(e) => setPenerbit(e.target.value)}
          />
          <TextField
            label="Tahun"
            variant="outlined"
            required
            onChange={(e) => setTahun(e.target.value.toString())}
          />
          <Button
            type="submit"
            variant="contained"
            color="green"
            style={{
              borderRadius: 10,
            }}
            sx={{
              mt: 2,
            }}
          >
            <Typography variant="subtitle1">Done</Typography>
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default InputModal;