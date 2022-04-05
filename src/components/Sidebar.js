import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import FolderIcon from "@mui/icons-material/Folder";
import SpeedIcon from "@mui/icons-material/Speed";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';


const drawerWidth = 240;

const useStyles = makeStyles(() => {
  return ({
  drawerPaper: {
    width: (theme) => theme.drawerWidth,
    backgroundColor: "rgba(0, 23, 48, 1)",
    color:"white",
  },

})});


const ListItemIconWhite = styled(ListItemIcon)({
  color: 'white',
});


function Sidebar(props) {
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

  const drawer =(
    <div>
      <Toolbar>E-Document</Toolbar>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "green" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader style={{ backgroundColor: "#001730", color:"white" }} component="div" id="nested-list-subheader">
            Main Navigation
          </ListSubheader>
        }
      >
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIconWhite>
              <SpeedIcon />
            </ListItemIconWhite>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={handleClick}>
          <ListItemIconWhite>
            <FolderIcon />
          </ListItemIconWhite>
          <ListItemText primary="Kelola data" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/kelola-data/dokumen"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIconWhite>
                  <StarBorder />
                </ListItemIconWhite>
                <ListItemText primary="Data Dokumen" />
              </ListItemButton>
            </Link>
            <Link
              to="/kelola-data/anggota"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIconWhite>
                  <StarBorder />
                </ListItemIconWhite>
                <ListItemText primary="Data Anggota" />
              </ListItemButton>
            </Link>
            <Link
              to="/kelola-data/peminjaman"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIconWhite>
                  <StarBorder />
                </ListItemIconWhite>
                <ListItemText primary="Data Peminjaman" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>{" "}
        <Link
          to="/sirkulasi"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIconWhite>
              <ChangeCircleIcon />
            </ListItemIconWhite>
            <ListItemText primary="Sirkulasi" />
          </ListItemButton>
        </Link>
        <Link
          to="/tambah-dokumen"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton>
            <ListItemIconWhite>
              <MenuBookIcon />
            </ListItemIconWhite>
            <ListItemText primary="Tambah Dokumen" />
          </ListItemButton>
        </Link>
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
          ml: { sm: `${drawerWidth}px` },
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
          {/* <Typography variant="h6" noWrap component="div">
            Nama
          </Typography> */}
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
            paper: classes.drawerPaper
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
