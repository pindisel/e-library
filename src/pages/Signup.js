import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/UserService";

const levels = [
  {
    value: "admin",
    label: "admin",
  },
  {
    value: "anggota",
    label: "anggota",
  },
  {
    value: "supervisor",
    label: "supervisor",
  },
];

const units = [
  {
    value: "IT",
    label: "IT",
  },
  {
    value: "administrasi",
    label: "administrasi",
  },
  {
    value: "HRD",
    label: "HRD",
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noKtp, setNoKtp] = useState("");
  const [unitKerja, setUnitKerja] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nama: nama,
      email: email,
      password: password,
      nomor_ktp: noKtp,
      unit_kerja: unitKerja,
      level: level,
      jenis_kelamin: jenisKelamin,
    };

    var dataKosong = [];
    for (const key in data) {
      if (data[key] === null || data[key].match(/^\s*$/)) {
        console.log(key);
        dataKosong.push(
          key.charAt(0).toUpperCase() + key.slice(1).replaceAll("_", " ")
        );
      }
    }

    dataKosong.forEach((item, index, arr) => {
      if (index !== 0) {
        arr[index] = " " + item;
      }
    });

    var dataSalah = [];
    if (
      !data.email.match(
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      dataSalah.push("Email");
    }
    if (data.password.length < 8) {
      dataSalah.push("Password");
    }
    if (!data.nomor_ktp.match(/^\d{16}$/)) {
      dataSalah.push("Nomor KTP");
    }
    dataSalah.forEach((item, index, arr) => {
      if (index !== 0) {
        arr[index] = " " + item;
      }
    });

    if (dataKosong.length === 0) {
      if (dataSalah.length === 0) {
        await UserService.addUser(data);
        navigate("/login");
      } else {
        alert(dataSalah + " tidak sesuai format");
      }
    } else {
      alert(dataKosong + " tidak dapat kosong");
    }
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6} sx={{ pl: 15, pr: 15 }}>
          <form>
            <Typography
              variant="h4"
              fontWeight={600}
              gutterBottom
              // sx={{
              //   mb: 15,
              // }}
            >
              E-Document
            </Typography>
            <Typography variant="h5" fontWeight={600} gutterBottom>
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
            <Typography variant="h5" fontWeight={600} gutterBottom>
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
                  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
              }
              helperText={
                email.length >= 1 &&
                !email.match(
                  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
                  ? "Format email tidak sesuai"
                  : ""
              }
              fullWidth
              focused
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
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
            <Typography variant="h5" fontWeight={600} gutterBottom>
              No. KTP
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="darkBlue"
              size="small"
              type="tel"
              fullWidth
              focused
              error={!noKtp.match(/^\d{16}$/) && noKtp.length >= 1}
              helperText={
                !noKtp.match(/^\d{16}$/) && noKtp.length >= 1
                  ? "Harus 16 karakter"
                  : ""
              }
              onChange={(e) => setNoKtp(e.target.value)}
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Unit Kerja
            </Typography>
            <Select
              fullWidth
              size="small"
              onChange={(e) => setUnitKerja(e.target.value)}
            >
              {units.map((option) => (
                <MenuItem value={option.value}>
                  <Typography variant="subtitle1">{option.label}</Typography>
                </MenuItem>
              ))}
            </Select>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Level
            </Typography>
            <Select
              fullWidth
              size="small"
              onChange={(e) => setLevel(e.target.value)}
            >
              {levels.map((option) => (
                <MenuItem value={option.value}>
                  <Typography variant="subtitle1">{option.label}</Typography>
                </MenuItem>
              ))}
            </Select>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Jenis Kelamin
            </Typography>
            <RadioGroup
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
            >
              <FormControlLabel
                value="laki-laki"
                control={<Radio />}
                label="Laki-laki"
              />
              <FormControlLabel
                value="perempuan"
                control={<Radio />}
                label="Perempuan"
              />
            </RadioGroup>
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
