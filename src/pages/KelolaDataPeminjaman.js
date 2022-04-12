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
} from "@mui/material";
import { DocumentService } from "../services/DocumentService";
import { Link } from "react-router-dom";

const KelolaData = () => {
  const user = JSON.parse(sessionStorage.getItem("pengguna"));
  var id = user.id_user;
  // console.log(id);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [borrowDoc, setborrowDoc] = useState([]);

  useEffect(() => {
    const fetchBorrow = async () => {
      const response = await DocumentService.getBorrowedDocument(id);
      const data = response.data;
      setborrowDoc(data);
    };

    fetchBorrow();
    // console.log(borrowDoc);
  }, [id]);

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
                <Typography variant="h6">No</Typography>
              </TableCell>
              <TableCell align="center" width={100}>
                <Typography variant="h6">Judul Dokumen</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography variant="h6">Nama Anggota</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography variant="h6">Tanggal Peminjaman</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography variant="h6">Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(borrowDoc[0])} */}
            {borrowDoc
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
                <TableRow
                  key={data.id}
                  component={Link}
                  to={`/docView/${data.id_peminjaman}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {page * rowsPerPage + (index + 1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {data.judul_dokumen}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">{data.nama}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {new Date(data.tanggal_peminjaman).toDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {data.konfirmasi.charAt(0).toUpperCase() +
                        data.konfirmasi.slice(1)}
                    </Typography>
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
