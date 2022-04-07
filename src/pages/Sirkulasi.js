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
  Button,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { DocumentService } from "../services/DocumentService";
import { KonfirmasiModal } from "../components";

const Sirkulasi = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataModal, setDataModal] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("pengguna"));
  // console.log(user);
  const id = user.id_user;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchBuku = async () => {
      const response = await DocumentService.getBorrowedSuper(id);
      const data = response.data;
      setDocuments(data);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - documents.length) : 0;

  return (
    <>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Sirkulasi
      </Typography>
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        style={{
          color: "#6F8197",
        }}
      >
        Sirkulasi Peminjaman
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={50}>
                No
              </TableCell>
              <TableCell align="center" width={100}>
                Judul Dokumen
              </TableCell>
              <TableCell align="center" width={200}>
                Nama Peminjam
              </TableCell>
              <TableCell align="center" width={200}>
                Tanggal Peminjaman
              </TableCell>
              <TableCell align="center" width={200}>
                Status
              </TableCell>
              <TableCell align="center" width={150}></TableCell>
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
                  <TableCell align="center">{data.judul_dokumen}</TableCell>
                  <TableCell align="center">{data.nama}</TableCell>
                  <TableCell align="center">
                    {new Date(data.tanggal_peminjaman).toDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {data.konfirmasi.charAt(0).toUpperCase() +
                      data.konfirmasi.slice(1)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="darkBlue"
                      onClick={() => {
                        setDataModal(data);
                        handleOpen();
                      }}
                    >
                      <Typography variant="subtitle1">Confirm</Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            <KonfirmasiModal
              open={open}
              handleClose={() => handleClose()}
              datas={dataModal}
            />
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

export default Sirkulasi;
