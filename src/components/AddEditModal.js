import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { DocumentService } from "../services/DocumentService";
import { useNavigate } from "react-router-dom";

const AddEditModal = ({ open, handleClose, datas }) => {
  const navigate = useNavigate();
  const [judul, setJudul] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahun, setTahun] = useState("");
  // console.log(datas);

  useEffect(() => {
    if (datas !== null) {
      setJudul(datas.judul);
      setPengarang(datas.pengarang);
      setPenerbit(datas.penerbit);
      setTahun(datas.tahun);
    }
  }, [datas]);

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
    console.log(dataKosong);
    if (dataKosong.length === 0) {
      if (datas === null) {
        await DocumentService.addDocument(data);
      } else {
        await DocumentService.editBooks(datas.id, data);
      }
      navigate("/kelola-data/dokumen");
      handleClose();
    } else {
      alert(dataKosong + " tidak dapat kosong");
    }

    try {
    } catch (error) {
      console.error(error.message);
    }
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
        open={open}
        onClose={handleClose}
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
            value={pengarang}
            onChange={(e) => setPengarang(e.target.value)}
          />
          <TextField
            label="Penerbit"
            variant="outlined"
            sx={{ mr: 2 }}
            required
            value={penerbit}
            onChange={(e) => setPenerbit(e.target.value)}
          />
          <TextField
            label="Tahun"
            variant="outlined"
            required
            value={tahun}
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

export default AddEditModal;
