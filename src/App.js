import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Dashboard,
  KelolaDataBuku,
  KelolaDataAnggota,
  Login,
  LogData,
  Sirkulasi,
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
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/log-data" element={<LogData />} />
              <Route exact path="/sirkulasi" element={<Sirkulasi />} />
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/"
                element={<Navigate to="/login" replace />}
              />
              <Route
                exact
                path="/kelola-data/buku"
                element={<KelolaDataBuku />}
              />
              <Route
                exact
                path="/kelola-data/anggota"
                element={<KelolaDataAnggota />}
              />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
