import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Container,
  styled,
  Paper,
  Box,
  Stack,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DocumentService } from "../services/DocumentService";
import { UserService } from "../services/UserService";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArticleIcon from "@mui/icons-material/Article";

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
          style={{ minHeight: "60vh", width: "90%" }}
        >
          <Grid item xs={6}>
            <Link to="/kelola-data/dokumen" style={{ textDecoration: "none" }}>
              <Item style={{ backgroundColor: "#5396C8", borderRadius: 10 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  style={{ paddingTop: "1%" }}
                >
                  <Grid
                    item
                    xs={6}
                    style={{
                      marginBottom: "5%",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#9CD1EF",
                        width: "75%",
                        height: "80%",
                        padding: 2,
                        marginLeft: "20%",
                      }}
                    >
                      <ArticleIcon
                        sx={{
                          width: "100%",
                          height: "100%",
                          color: "#006CBC",
                        }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      direction="column"
                      style={{
                        marginRight: "50%",
                        marginBottom: "40%",
                      }}
                    >
                      <Grid
                        item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          style={{
                            lineHeight: "60px",
                            fontWeight: 600,
                            fontSize: "2.25rem",
                          }}
                        >
                          Dokumen
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h4"
                          fontWeight={600}
                          style={{
                            marginTop: "15px",
                            backgroundColor: "#9CD1EF",
                            padding: "15px",
                            borderRadius: 10,
                            width: "25%",
                            textAlign: "center",
                          }}
                        >
                          {dokumen}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
            </Link>
          </Grid>
          {user.level === "admin" ? (
            <Grid item xs={6}>
              <Link
                to="/kelola-data/anggota"
                style={{ textDecoration: "none" }}
              >
                <Item style={{ backgroundColor: "#FFCE31", borderRadius: 10 }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    style={{ paddingTop: "1%" }}
                  >
                    <Grid
                      item
                      xs={6}
                      style={{
                        marginBottom: "5%",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#F9E178",
                          width: "75%",
                          height: "80%",
                          padding: 3,
                          marginLeft: "20%",
                        }}
                      >
                        <PersonAddIcon
                          sx={{
                            width: "100%",
                            height: "100%",
                            color: "#CD9C00",
                          }}
                        />
                      </Avatar>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        container
                        direction="column"
                        style={{
                          marginRight: "50%",
                          marginBottom: "40%",
                        }}
                      >
                        <Grid
                          item
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            style={{
                              lineHeight: "60px",
                              fontWeight: 600,
                              fontSize: "2.25rem",
                            }}
                          >
                            Anggota
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="h4"
                            fontWeight={600}
                            style={{
                              marginTop: "15px",
                              backgroundColor: "#F9E178",
                              padding: "15px",
                              borderRadius: 10,
                              width: "25%",
                              textAlign: "center",
                            }}
                          >
                            {anggota}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                  style={{ paddingTop: "1%" }}
                >
                  <Grid
                    item
                    xs={6}
                    style={{
                      marginBottom: "5%",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#81CAAD",
                        width: "75%",
                        height: "80%",
                        padding: 1,
                        marginLeft: "20%",
                      }}
                    >
                      <BarChartIcon
                        sx={{
                          width: "100%",
                          height: "100%",
                          color: "#007C4B",
                        }}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      direction="column"
                      style={{
                        marginRight: "50%",
                        marginBottom: "40%",
                      }}
                    >
                      <Grid
                        item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          style={{
                            lineHeight: "60px",
                            fontWeight: 600,
                            fontSize: "2.25rem",
                          }}
                        >
                          Peminjaman
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h4"
                          fontWeight={600}
                          style={{
                            marginTop: "15px",
                            backgroundColor: "#81CAAD",
                            padding: "15px",
                            borderRadius: 10,
                            width: "25%",
                            textAlign: "center",
                          }}
                        >
                          {peminjaman}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Item>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
