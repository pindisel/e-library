import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography, Stack } from "@mui/material";
import { DocumentService } from "../services/DocumentService";

const KonfirmasiModal = ({ open, handleClose, datas }) => {
  const [nama, setNama] = useState("");
  const [judulDokumen, setJudulDokumen] = useState("");
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    if (datas !== null) {
      setNama(datas.nama);
      setJudulDokumen(datas.judul_dokumen);
      setTanggal(datas.tanggal_peminjaman);
    }
  }, [datas]);

  const handleConfirm = async () => {
    const data = {
      konfirmasi: "diterima",
    };
    await DocumentService.editStatus(datas.id_peminjaman, data);
  };

  const handleDecline = async () => {
    const data = {
      konfirmasi: "ditolak",
    };
    await DocumentService.editStatus(datas.id_peminjaman, data);
  };

  const ModalBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "#FDFAFA",
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
        <Box component="form" sx={ModalBoxStyle} noValidate autoComplete="off">
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.darkBlue.main,
            }}
          >
            Nama Peminjam
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {nama}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.darkBlue.main,
            }}
          >
            Judul Dokumen yang Dipinjam
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {judulDokumen}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.darkBlue.main,
            }}
          >
            Tanggal Peminjaman
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {new Date(tanggal).toDateString()}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {" "}
            <Button variant="contained" color="error" onClick={handleDecline}>
              <Typography variant="subtitle1">Decline</Typography>
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="green"
              onClick={handleConfirm}
            >
              <Typography variant="subtitle1">Continue</Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default KonfirmasiModal;
