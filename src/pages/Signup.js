import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../services/RegisterService";

const Signup = () => {
  const navigate = useNavigate();
  function handleSubmit() {
    if (
      email === null ||
      !email.trim() ||
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      alert("Please fill all the details!");
    } else {
      navigate("/dashboard");
    }
  }
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(nama);
  console.log(email);
  console.log(password);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6} sx={{ p: 15 }}>
          <form>
            <Typography
              variant="h4"
              fontWeight={600}
              gutterBottom
              sx={{
                mb: 15,
              }}
            >
              E-Document
            </Typography>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Nama
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="darkBlue"
              size="small"
              fullWidth
              focused
              onChange={(e) => setNama(e.target.value)}
            />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Email
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="darkBlue"
              size="small"
              error={
                email.length >= 1 &&
                !email.match(
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
              }
              helperText={
                email.length >= 1 &&
                !email.match(
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
                  ? "Format email tidak sesuai"
                  : ""
              }
              fullWidth
              focused
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Password
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="darkBlue"
              size="small"
              type="password"
              fullWidth
              focused
              error={password.length < 8 && password.length >= 1}
              helperText={
                password.length < 8 && password.length >= 1
                  ? "Min. 8 karakter"
                  : ""
              }
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="darkBlue"
              type="submit"
              sx={{
                mt: 5,
              }}
              style={{ borderRadius: 10 }}
              fullWidth
              onClick={handleSubmit}
            >
              <Typography variant="h6">Sign Up</Typography>
            </Button>
          </form>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Typography variant="h6">Sudah memiliki akun?</Typography>
            <Button
              variant="contained"
              color="darkBlue"
              type="submit"
              style={{ borderRadius: 10 }}
              fullWidth
              onClick={() => {
                navigate("/login");
              }}
            >
              <Typography variant="h6">Log In</Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor="darkBlue.main" height="100vh" />
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
