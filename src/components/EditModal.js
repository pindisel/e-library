import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { DocumentService } from "../services/DocumentService";
import { useNavigate } from "react-router-dom";

const EditModal = ({ open, handleClose, datas }) => {
  const navigate = useNavigate();
  const [judulDokumen, setJudulDokumen] = useState("");
  const [supervisor, setSupervisor] = useState([]);
  const [pic, setPic] = useState(null);
  const [kategori, setKategori] = useState("");
  const [files, setFiles] = useState([]);
  const [namaPic, setNamaPic] = useState("");
  const [namaFile, setNamaFile] = useState("");

  console.log(datas);

  useEffect(() => {
    const fetchSupervisor = async () => {
      const response = await DocumentService.getSupervisor();
      const data = response.data;
      setSupervisor(data);
    };

    fetchSupervisor();

    if (datas !== null) {
      setJudulDokumen(datas.judul_dokumen);
      setPic(datas.id_pic);
      setKategori(datas.kategori_dokumen);
      setNamaFile(datas.judul_dokumen);
      setNamaPic(datas.nama_pic);
    }
  }, [datas]);

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
    formData.append("id_pic", pic);
    formData.append("judul_dokumen", judulDokumen);
    formData.append("nama_pic", namaPic);
    formData.append("kategori_dokumen", kategori);
    formData.append("file", files[0]);

    await DocumentService.editDocument(datas.id_dokumen, formData);
    navigate("/kelola-data/dokumen");
    handleClose();
    window.location.reload();
  };

  const handleChange = (element) => {
    setPic(element.target.value);
    supervisor.forEach((element) => {
      if (element.id_user === pic) {
        setNamaPic(element.nama);
      }
    });
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
        <Box
          component="form"
          sx={ModalBoxStyle}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <div
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            style={{
              height: 150,
              borderStyle: "solid",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <>
                <Typography variant="h6">{namaFile}</Typography>
              </>
            ) : (
              <>
                <Typography variant="h6">{files[0].path}</Typography>
              </>
            )}
          </div>

          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.darkBlue.main,
            }}
          >
            Judul Dokumen
          </Typography>
          <TextField
            variant="outlined"
            color="darkBlue"
            size="small"
            fullWidth
            focused
            value={judulDokumen}
            onChange={(e) => setJudulDokumen(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box
            sx={{
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                color: (theme) => theme.palette.darkBlue.main,
              }}
            >
              PIC Dokumen
            </Typography>
            <Select
              fullWidth
              defaultValue={pic}
              onChange={handleChange}
              size="small"
              value={pic}
            >
              {supervisor.map((option) => (
                <MenuItem
                  key={option.id_user}
                  value={option.id_user}
                  label={option.nama}
                >
                  {option.nama}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: (theme) => theme.palette.darkBlue.main,
            }}
          >
            Kategori Dokumen
          </Typography>
          <RadioGroup
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            sx={{
              mb: 3,
            }}
          >
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                value="rahasia"
                control={<Radio />}
                label="rahasia"
              />
              <FormControlLabel
                value="tidak rahasia"
                control={<Radio />}
                label="tidak rahasia"
              />
            </Stack>
          </RadioGroup>
          <Button type="submit" variant="contained" color="green" fullWidth>
            <Typography variant="h6">Edit</Typography>
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EditModal;
