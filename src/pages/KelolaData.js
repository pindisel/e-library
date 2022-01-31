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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiTrash2, FiEdit } from "react-icons/fi";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { InputModal, EditModal } from "../components";
import { BookService } from "../services/BookService";

const SubHeading = styled("div")({
  backgroundColor: "#6F8197",
  width: "fit-content",
  color: "white",
  borderRadius: "5px",
});

const KelolaData = () => {
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

  //Input Modal
  const [openInput, setOpenInput] = useState(false);
  const handleOpenInput = () => setOpenInput(true);
  const handleCloseInput = () => setOpenInput(false);

  //Edit Modal
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [dataModal, setDataModal] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBuku = async () => {
      const response = await BookService.getBooks();
      const data = response.data;
      setBooks(data);
    };

    fetchBuku();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

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
        onClick={handleOpenInput}
      >
        <Typography variant="subtitle1">Tambah Buku</Typography>
      </Button>
      <InputModal
        openInput={openInput}
        handleCloseInput={() => handleCloseInput()}
      />
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
            {books
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
                    <IconButton
                      color="green"
                      onClick={() => {
                        setDataModal(data);
                        handleOpenEdit();
                      }}
                    >
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
            {dataModal !== null ? (
              <EditModal
                openEdit={openEdit}
                handleOpenEdit={() => handleOpenEdit()}
                handleCloseEdit={() => handleCloseEdit()}
                datas={dataModal}
              />
            ) : null}

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
        count={books.length}
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
