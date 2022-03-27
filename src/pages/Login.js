import React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";

const Login = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6} sx={{ p: 15 }}>
          <Container>
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
              Email
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="darkBlue"
              size="small"
              fullWidth
              focused
            />
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Password
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="darkBlue"
              size="small"
              fullWidth
              focused
            />
            <Button
              variant="contained"
              color="darkBlue"
              sx={{
                mt: 5,
              }}
              style={{ borderRadius: 10 }}
              fullWidth
            >
              <Typography variant="h6">Login</Typography>
            </Button>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Box bgcolor="darkBlue.main" height="100vh" />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
