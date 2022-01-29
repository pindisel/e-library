import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";

const DrawerStyle = styled(Drawer)({
  width: 240,
});

const Sidebar = () => {
  return (
    <DrawerStyle
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          backgroundColor: "#F2F2F2",
          width: 240,
        },
      }}
    >
      <div>
        <Box>
          <Typography variant="h5">E-Library</Typography>
        </Box>
      </div>
    </DrawerStyle>
  );
};

export default Sidebar;
