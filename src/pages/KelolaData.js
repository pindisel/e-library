import React, { useState, useEffect } from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiTrash2, FiEdit } from "react-icons/fi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
//aapa

const SubHeading = styled("div")({
  backgroundColor: "#6F8197",
  width: "fit-content",
  color: "white",
  borderRadius: "5px",
});

const KelolaData = () => {
  const [judul, setJudul] = useState();
  const [pengarang, setPengarang] = useState();
  const [penerbit, setPenerbit] = useState();
  const [tahun, setTahun] = useState();

  const getBooks = async () => {
    try {
      const response = await fetch("https://elibrary-back.herokuapp.com/buku");
      const data = await response.json();

      setBook(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const addBook = async () => {
    await axios
      .post("https://elibrary-back.herokuapp.com/buku", {
        judul: judul,
        pengarang: pengarang,
        penerbit: penerbit,
        tahun: tahun,
      })
      .then((window.location = "/kelola-data"));
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`https://elibrary-back.herokuapp.com/buku/${id}`, {
        method: "DELETE",
      });
      window.location = "/kelola-data";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [datas, setBook] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

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
      <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
        Master Data
      </Typography>
      <SubHeading
        sx={{
          pl: 2,
          pr: 2,
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Data Buku
        </Typography>
      </SubHeading>
      <Button
        variant="contained"
        color="green"
        startIcon={<AddBoxIcon />}
        sx={{
          mt: 5,
        }}
        style={{ borderRadius: 10 }}
        onClick={handleOpen}
      >
        <Typography variant="subtitle1">Tambah Buku</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={ModalBoxStyle} noValidate autoComplete="off">
          <div>
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
              onChange={(e) => setTahun(e.target.value)}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Button
              onClick={() => addBook()}
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
          </div>
        </Box>
      </Modal>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={50}>
                No
              </TableCell>
              <TableCell align="center" width={100}>
                Id Buku
              </TableCell>
              <TableCell align="center" width={200}>
                Judul Buku
              </TableCell>
              <TableCell align="center" width={200}>
                Pengarang
              </TableCell>
              <TableCell align="center" width={200}>
                Penerbit
              </TableCell>
              <TableCell align="center" width={50}>
                Tahun
              </TableCell>
              <TableCell align="center" width={100}>
                Kelola
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => (
                <TableRow key={data.id}>
                  <TableCell align="center">{data.id}</TableCell>
                  <TableCell align="center">{data.idbuku}</TableCell>
                  <TableCell align="center">{data.judul}</TableCell>
                  <TableCell align="center">{data.pengarang}</TableCell>
                  <TableCell align="center">{data.penerbit}</TableCell>
                  <TableCell align="center">{data.tahun}</TableCell>
                  <TableCell align="center">
                    <IconButton color="green">
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteBook(data.id)}
                      color="error"
                    >
                      <FiTrash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 73 * emptyRows,
                }}
              >
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={datas.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 25]}
      />
    </>
  );
};

export default KelolaData;
