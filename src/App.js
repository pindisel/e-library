import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, KelolaData } from "./pages";
import { Layout } from "./components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/keloladata" element={<KelolaData />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
