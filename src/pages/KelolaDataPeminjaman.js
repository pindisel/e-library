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
} from "@mui/material";
import { FiTrash2, FiEdit } from "react-icons/fi";
// import { TablePaginationUnstyled } from "@mui/base";
import { AddEditModal } from "../components";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { DocumentService } from "../services/DocumentService";
import { useNavigate } from "react-router-dom";

const KelolaData = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("pengguna"));
  var id = user.id_user;
  // console.log(id);
  //Input Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataModal, setDataModal] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [borrowDoc, setborrowDoc] = useState([]);
  const date = new Date();
  useEffect(() => {
    const fetchBorrow = async () => {
      const response = await DocumentService.getBorrowedDocument(id);
      const data = response.data;
      setborrowDoc(data);
    };

    fetchBorrow();
    // console.log(borrowDoc);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - borrowDoc.length) : 0;

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
        Data Peminjaman
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={50}>
                <Typography>No</Typography>
              </TableCell>
              <TableCell align="center" width={100}>
                <Typography>Judul Dokumen</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography>Nama Anggota</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography>Tanggal Peminjaman</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowDoc.length === 0 ? (
              <TableCell colSpan={5} align="center">
                <Typography>Tidak ada dokumen yang dipinjam</Typography>
              </TableCell>
            ) : (
              borrowDoc
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell align="center">
                      <Typography>
                        {page * rowsPerPage + (index + 1)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{data.judul_dokumen}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{data.nama}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        {new Date(data.tanggal_peminjaman).toDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>
                        {data.konfirmasi.charAt(0).toUpperCase() +
                          data.konfirmasi.slice(1)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
            )}

            <AddEditModal
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
        count={borrowDoc.length}
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
