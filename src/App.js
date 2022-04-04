import React, { useState } from "react";
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
  const [loggedIn, setloggedIn] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              exact
              path="/login"
              element={<Login setloggedIn={setloggedIn} />}
            />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Navigate to="/login" replace />} />
          </Routes>
          {loggedIn ? (
            <Layout>
              <Routes>
                <Route exact path="/dashboard" element={<Dashboard loggedIn={loggedIn}/>} />
                <Route
                  exact
                  path="/tambah-dokumen"
                  element={<TambahDokumen />}
                />
                 <Route
                  exact
                  path="/konfirmasi-peminjaman/dokumen-:id"
                  element={<KonfirmasiUser/>}
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
              </Routes>
            </Layout>
          ) : null}
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
