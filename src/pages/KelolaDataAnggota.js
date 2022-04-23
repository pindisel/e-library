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
import { UserService } from "../services/UserService";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const KelolaData = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const deleteUser = async (id) => {
    await UserService.deleteUser(id);
    navigate("kelola-data/anggota");
  };

  // console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await UserService.getUser();
      const data = response.data;
      setUser(data);
    };

    fetchUser();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - user.length) : 0;

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
        Data Anggota
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={50}>
                <Typography variant="h6">No</Typography>
              </TableCell>
              <TableCell align="center" width={100}>
                <Typography variant="h6">Id Anggota</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography variant="h6">Nama Anggota</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography variant="h6">Username</Typography>
              </TableCell>
              <TableCell align="center" width={200}>
                <Typography variant="h6">Level Anggota</Typography>
              </TableCell>
              <TableCell align="center" width={50}>
                <Typography variant="h6">Jenis Kelamin</Typography>
              </TableCell>
              <TableCell align="center" width={50}>
                <Typography variant="h6">Kelola</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {page * rowsPerPage + (index + 1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">{data.id_user}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">{data.nama}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">{data.level}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {data.unit_kerja}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {data.jenis_kelamin}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      onClick={() => deleteUser(data.id_user)}
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
                  height: 53 * emptyRows,
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
        count={user.length}
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
