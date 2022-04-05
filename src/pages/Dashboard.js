import React from "react";
import { Typography, Grid, Container, styled, Paper } from "@mui/material";

const Item = styled(Paper)({
  textAlign: "center",
  height: 250,
  lineHeight: "60px",
  fontWeight: 600,
  fontSize: "1.75rem",
});

const Dashboard = () => {
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
          Administrator
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
            <Item style={{ backgroundColor: "#5396C8", borderRadius: 10 }}>
              Dokumen
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={{ backgroundColor: "#FFCE31", borderRadius: 10 }}>
              Anggota
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={{ backgroundColor: "#81CAAD", borderRadius: 10 }}>
              Peminjaman
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={{ backgroundColor: "#E95735", borderRadius: 10 }}>
              Pengembalian
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
