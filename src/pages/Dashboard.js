import React, { useEffect, useState } from "react";
import { Typography, Grid, Container, styled, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { DocumentService } from "../services/DocumentService";
import { UserService } from "../services/UserService";

const Item = styled(Paper)({
  height: "30vh",
  display: "flex",
  flexDirection: "column",
  padding: "1vw",
  alignItems: "center",
});

const Dashboard = () => {
  const [dokumen, setDokumen] = useState(0);
  const [anggota, setAnggota] = useState(0);
  const [peminjaman, setPeminjaman] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const responseDoc = await DocumentService.getDocument();
      setDokumen(responseDoc.data.length);
      const responseUser = await UserService.getUser();
      if (user === "admin") {
        const responsePinjam = await DocumentService.getAllBorrowedDocument();
        setPeminjaman(responsePinjam.data.length);
      } else if (user === "supervisor") {
        const responsePinjam = await DocumentService.getBorrowedDocument(id);
        setPeminjaman(responsePinjam.data.length);
      }
      setAnggota(responseUser.data.length);
    };
    fetchData();
  }, []);

  const user = JSON.parse(sessionStorage.getItem("pengguna"));
  var id = user.id_user;
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Dashboard
        </Typography>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          style={{
            color: "#6F8197",
          }}
        >
          {user.level.charAt(0).toUpperCase() + user.level.slice(1)}
        </Typography>

        <Grid
          container
          rowSpacing={{ xs: 1, sm: 2, md: 5 }}
          columnSpacing={{ xs: 1, sm: 2, md: 10 }}
          style={{ minHeight: "60vh" }}
        >
          <Grid item xs={6}>
            <Link to="/kelola-data/dokumen" style={{ textDecoration: "none" }}>
              <Item style={{ backgroundColor: "#5396C8", borderRadius: 10 }}>
                <Typography
                  style={{
                    lineHeight: "60px",
                    fontWeight: 600,
                    fontSize: "2.25rem",
                    marginLeft: "50%",
                  }}
                >
                  Dokumen
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  style={{
                    marginTop: "15px",
                    marginLeft: "50%",
                    backgroundColor: "#9CD1EF",
                    padding: "15px",
                    borderRadius: 10,
                  }}
                >
                  {dokumen}
                </Typography>
              </Item>
            </Link>
          </Grid>
          {user.level !== "anggota" ? (
            <Grid item xs={6}>
              <Link
                to="/kelola-data/anggota"
                style={{ textDecoration: "none" }}
              >
                <Item style={{ backgroundColor: "#FFCE31", borderRadius: 10 }}>
                  <Typography
                    style={{
                      lineHeight: "60px",
                      fontWeight: 600,
                      fontSize: "2.25rem",
                      marginLeft: "50%",
                    }}
                  >
                    Anggota
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    style={{
                      marginTop: "15px",
                      marginLeft: "50%",
                      backgroundColor: "#F9E178",
                      padding: "15px",
                      borderRadius: 10,
                    }}
                  >
                    {anggota}
                  </Typography>
                </Item>
              </Link>
            </Grid>
          ) : null}
          <Grid item xs={6}>
            <Link
              to="/kelola-data/peminjaman"
              style={{ textDecoration: "none" }}
            >
              <Item style={{ backgroundColor: "#3EA079", borderRadius: 10 }}>
                <Typography
                  style={{
                    lineHeight: "60px",
                    fontWeight: 600,
                    fontSize: "2.25rem",
                    marginLeft: "50%",
                  }}
                >
                  Peminjaman
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  style={{
                    marginTop: "15px",
                    marginLeft: "50%",
                    backgroundColor: "#81CAAD",
                    padding: "15px",
                    borderRadius: 10,
                  }}
                >
                  {peminjaman}
                </Typography>
              </Item>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
