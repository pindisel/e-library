import * as React from "react";
import PropTypes from "prop-types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import MenuIcon from "@mui/icons-material/Menu";
import FolderIcon from "@mui/icons-material/Folder";
import SpeedIcon from "@mui/icons-material/Speed";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {
  styled,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Toolbar,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import icoAdmin from "../assets/ProfileImage/icoAdmin.svg";
import icoPeas from "../assets/ProfileImage/icoPeas.svg";
import icoSup from "../assets/ProfileImage/icoSup.svg";

// console.log(icoPicker);

// if (icoPicker === "Anggota") {
//   colPicker = "warning";
// } else if (icoPicker === "Supervisor") {
//   colPicker = "success";
// } else if (icoPicker === "Administrator") {
//   colPicker = "primary";
// } else {
//   colPicker = "warning";
// }

function Sidebar(props) {
  const user = JSON.parse(sessionStorage.getItem("pengguna"));
  var icoPicker = user.level;
  const IconPicker = () => {
    if (icoPicker === "anggota") {
      return <img src={icoPeas} alt="icon" />;
    } else if (icoPicker === "supervisor") {
      return <img src={icoSup} alt="icon" />;
    } else if (icoPicker === "admin") {
      return <img src={icoAdmin} alt="icon" />;
    } else {
      return <img src={icoPeas} alt="icon" />;
    }
  };

  var hideParam;
  icoPicker === "anggota" ? (hideParam = "none") : (hideParam = "block");

  const drawerWidth = 240;

  const useStyles = makeStyles(() => {
    return {
      drawerPaper: {
        width: (theme) => theme.drawerWidth,
        backgroundColor: "rgba(0, 23, 48, 1)",
        color: "white",
      },
    };
  });

  const ListItemIconWhite = styled(ListItemIcon)({
    color: "white",
  });
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const classes = useStyles(theme);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ height: "120px" }}>
        <Typography variant="h5" fontWeight={600}>
          E-Document
        </Typography>
      </Toolbar>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "green" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            style={{
              backgroundColor: "#001730",
              color: "white",
              fontSize: "20px",
              marginTop: "18px",
            }}
            component="div"
            id="nested-list-subheader"
          >
            Main Navigation
          </ListSubheader>
        }
      >
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIconWhite>
            <SpeedIcon />
          </ListItemIconWhite>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIconWhite>
            <FolderIcon />
          </ListItemIconWhite>
          <ListItemText primary="Kelola data" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="/kelola-data/dokumen"
              sx={{ pl: 4 }}
            >
              <ListItemIconWhite>
                <StarBorder />
              </ListItemIconWhite>
              <ListItemText primary="Data Dokumen" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/kelola-data/anggota"
              sx={{ pl: 4, display: `${hideParam}` }}
            >
              <ListItemIconWhite>
                <StarBorder />
              </ListItemIconWhite>
              <ListItemText primary="Data Anggota" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/kelola-data/peminjaman"
              sx={{ pl: 4 }}
            >
              <ListItemIconWhite>
                <StarBorder />
              </ListItemIconWhite>
              <ListItemText primary="Data Peminjaman" />
            </ListItemButton>
          </List>
        </Collapse>{" "}
        <ListItemButton
          component={Link}
          to="/sirkulasi"
          sx={{ display: `${hideParam}` }}
        >
          <ListItemIconWhite>
            <ChangeCircleIcon />
          </ListItemIconWhite>
          <ListItemText primary="Sirkulasi" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/tambah-dokumen"
          sx={{ display: `${hideParam}` }}
        >
          <ListItemIconWhite>
            <MenuBookIcon />
          </ListItemIconWhite>
          <ListItemText primary="Tambah Dokumen" />
        </ListItemButton>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "120px",
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
          color: "black",
          boxShadow: "0",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ ml: "auto", mr: 2, mt: "10px" }}>
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  noWrap
                  component="div"
                >
                  {user.nama}
                </Typography>
                <Typography variant="h6" noWrap component="div">
                  {user.level.charAt(0).toUpperCase() + user.level.slice(1)}
                </Typography>
                <Button variant="contained" color="error">
                  logout
                </Button>
              </Grid>
              <Grid item>
                <IconPicker />
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
