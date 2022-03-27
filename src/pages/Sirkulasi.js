import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const Sirkulasi = () => {
  const [currency, setCurrency] = React.useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          ml: 10,
          pt: 10,
        }}
      >
        <Typography variant="h4">Kelola Data</Typography>
        <Typography
          sx={{
            width: 500,
            maxWidth: "100%",
            mt: 1,
            mb: 5,
          }}
        >
          Tambah anggota
        </Typography>

        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Nama</Typography>
          <TextField fullWidth id="fullWidth" />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Username</Typography>
          <TextField fullWidth id="fullWidth" />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Password</Typography>
          <TextField fullWidth id="fullWidth" />
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
          }}
        >
          <Typography>Level</Typography>
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            value={currency}
            onChange={handleChange}
          >
            {currencies.map((option) => (
              <MenuItem fullWidth key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box
          sx={{
            width: 700,
            maxWidth: "100%",
            m: 2,
            mt: 7,
            pl: 69,
          }}
        >
          <Stack direction="row" spacing={2}>
            {" "}
            <Button variant="contained" color="error">
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Add
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Sirkulasi;
