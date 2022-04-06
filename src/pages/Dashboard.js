import React from "react";
import { Typography, Grid, Container, styled, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Item = styled(Paper)({
  textAlign: "center",
  height: 250,
  lineHeight: "60px",
  fontWeight: 600,
  fontSize: "1.75rem",
});

const Dashboard = () => {
  const user = JSON.parse(sessionStorage.getItem("pengguna"));
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
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            mt: 5,
          }}
          style={{ minHeight: "60vh" }}
        >
          <Grid item xs={6}>
            <Link to="/kelola-data/dokumen" style={{ textDecoration: "none" }}>
              <Item style={{ backgroundColor: "#5396C8", borderRadius: 10 }}>
                Dokumen
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
                  Anggota
                </Item>
              </Link>
            </Grid>
          ) : null}
          <Grid item xs={6}>
            <Link
              to="/kelola-data/peminjaman"
              style={{ textDecoration: "none" }}
            >
              <Item style={{ backgroundColor: "#81CAAD", borderRadius: 10 }}>
                Peminjaman
              </Item>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
