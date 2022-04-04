import React from "react";
import { Typography, Grid, Container, styled, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SubHeading = styled("div")({
  backgroundColor: "#6F8197",
  width: "fit-content",
  color: "white",
  borderRadius: "5px",
});

const Item = styled(Paper)({
  textAlign: "center",
  height: 250,
  lineHeight: "60px",
  fontWeight: 600,
  fontSize: "1.75rem",
});

const Dashboard = ({ loggedIn }) => {
  const navigate = useNavigate();
  return (
    <>
      {loggedIn ? (
        <Container maxWidth="xl">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Dashboard
          </Typography>
          <SubHeading
            sx={{
              pl: 2,
              pr: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Administrator
            </Typography>
          </SubHeading>
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
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Dashboard;
