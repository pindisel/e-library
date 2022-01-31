import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { BookService } from "../services/BookService";

const EditModal = ({ openEdit, handleCloseEdit, datas }) => {
  // console.log(datas);
  const [judul, setJudul] = useState();
  const [pengarang, setPengarang] = useState();
  const [penerbit, setPenerbit] = useState();
  const [tahun, setTahun] = useState();

  useEffect(() => {
    console.log(datas.judul);
    setJudul(datas.judul);
    setPengarang(datas.pengarang);
    setPenerbit(datas.penerbit);
    setTahun(datas.tahun);
  }, [datas.judul, datas.pengarang, datas.penerbit, datas.tahun]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await BookService.editBooks(datas.id, {
      judul: judul,
      pengarang: pengarang,
      penerbit: penerbit,
      tahun: tahun,
    });
    window.location = "/kelola-data";
    handleCloseEdit();
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

  if (
    datas && // 👈 null and undefined check
    Object.keys(datas).length === 0 &&
    Object.getPrototypeOf(datas) === Object.prototype
  ) {
    return null;
  }

  return (
    <>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
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
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
          <TextField
            label="Pengarang"
            variant="outlined"
            sx={{ mr: 2 }}
            required
            onChange={(e) => setPengarang(e.target.value)}
            value={pengarang}
          />
          <TextField
            label="Penerbit"
            variant="outlined"
            sx={{ mr: 2 }}
            required
            onChange={(e) => setPenerbit(e.target.value)}
            value={penerbit}
          />
          <TextField
            label="Tahun"
            variant="outlined"
            required
            onChange={(e) => setTahun(e.target.value.toString())}
            value={tahun}
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

export default EditModal;
