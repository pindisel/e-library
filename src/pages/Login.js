import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  // console.log(email);
  // console.log(password);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    // console.log(data);
    const response = await UserService.loginUser(data);
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("pengguna", JSON.stringify(response.data.pengguna));

    navigate("/dashboard");
    window.location.reload();
  };

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6} sx={{ p: 10 }}>
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
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Email
            </Typography>
            <TextField
              variant="outlined"
              color="darkBlue"
              size="small"
              fullWidth
              focused
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Password
            </Typography>
            <TextField
              variant="outlined"
              color="darkBlue"
              size="small"
              type={showPass ? "text" : "password"}
              fullWidth
              focused
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              onClick={onSubmit}
            >
              <Typography variant="h6">Login</Typography>
            </Button>
          </form>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <Typography variant="h6">Belum memiliki akun?</Typography>
            <Button
              variant="contained"
              color="darkBlue"
              type="submit"
              style={{ borderRadius: 10 }}
              fullWidth
              onClick={() => {
                navigate("/signup");
              }}
            >
              <Typography variant="h6">Sign Up</Typography>
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

export default Login;
