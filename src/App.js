import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Dashboard,
  KelolaDataDokumen,
  KelolaDataAnggota,
  Login,
  Sirkulasi,
  Signup,
  TambahDokumen,
  KonfirmasiUser,
  KelolaDataPeminjaman,
  // DocumentViewer,
} from "./pages";
import { Layout } from "./components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    green: {
      main: "#007C4B",
      contrastText: "#fff",
    },
    darkBlue: {
      main: "#001730",
      contrastText: "#fff",
    },
  },
});

function App() {
  const token = sessionStorage.getItem("token");
  const pengguna = sessionStorage.getItem("pengguna");

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {token && pengguna ? (
            <Layout>
              <Routes>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route
                  exact
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route
                  exact
                  path="/tambah-dokumen"
                  element={<TambahDokumen />}
                />
                <Route
                  exact
                  path="/konfirmasi-peminjaman/dokumen/:id"
                  element={<KonfirmasiUser />}
                />
                <Route exact path="/sirkulasi" element={<Sirkulasi />} />
                <Route
                  exact
                  path="/kelola-data/dokumen"
                  element={<KelolaDataDokumen />}
                />
                <Route
                  exact
                  path="/kelola-data/anggota"
                  element={<KelolaDataAnggota />}
                />
                <Route
                  exact
                  path="/kelola-data/peminjaman"
                  element={<KelolaDataPeminjaman />}
                />
                <Route
                  exact
                  path="/*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </Layout>
          ) : (
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route
                exact
                path="/*"
                element={<Navigate to="/login" replace />}
              />
              {/* <Route exact path="/docView" element={<DocumentViewer />} /> */}
            </Routes>
          )}
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
