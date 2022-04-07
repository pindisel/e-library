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
import { FiTrash2 } from "react-icons/fi";
// import { AddEditModal } from "../components";
import { DocumentService } from "../services/DocumentService";
import { Link, useNavigate } from "react-router-dom";

const KelolaData = () => {
  const navigate = useNavigate();
  const deleteDocument = async (id) => {
    try {
      await fetch(`https://elibrary-back.herokuapp.com/dokumen/${id}`, {
        method: "DELETE",
      });
      navigate("/kelola-data/dokumen");
    } catch (err) {
      console.error(err.message);
    }
  };

  //Input Modal
  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);
  // const [dataModal, setDataModal] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDokumen = async () => {
      const response = await DocumentService.getDocument();
      const data = response.data;
      setDocuments(data);
    };

    fetchDokumen();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - documents.length) : 0;

  return (
    <>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Master Data
      </Typography>
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        style={{
          color: "#6F8197",
        }}
      >
        Data Dokumen
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={50}>
                No
              </TableCell>
              <TableCell align="center" width={100}>
                Id
              </TableCell>
              <TableCell align="center" width={200}>
                Judul Dokumen
              </TableCell>
              <TableCell align="center" width={200}>
                PIC
              </TableCell>
              <TableCell align="center" width={50}>
                Kategori
              </TableCell>
              <TableCell align="center" width={150}>
                Kelola
              </TableCell>
              <TableCell align="center" width={150}>
                Pinjam?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell align="center">
                    {page * rowsPerPage + (index + 1)}
                  </TableCell>
                  <TableCell align="center">{data.id_dokumen}</TableCell>
                  <TableCell align="center">{data.judul_dokumen}</TableCell>
                  <TableCell align="center">{data.id_pic}</TableCell>
                  <TableCell align="center">{data.kategori_dokumen}</TableCell>
                  <TableCell align="center">
                    {/* <IconButton
                      color="green"
                      onClick={() => {
                        setDataModal(data);
                        handleOpen();
                      }}
                    >
                      <FiEdit />
                    </IconButton> */}
                    <IconButton
                      onClick={() => deleteDocument(data.id)}
                      color="error"
                    >
                      <FiTrash2 />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component={Link}
                      to={`/konfirmasi-peminjaman/dokumen/${data.id_dokumen}`}
                      variant="contained"
                    >
                      pinjam
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {/* <AddEditModal
              open={open}
              handleClose={() => handleClose()}
              datas={dataModal}
            /> */}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 73 * emptyRows,
                }}
              >
                <TableCell colSpan={7} />
              </TableRow>
            )}
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
        count={documents.length}
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
