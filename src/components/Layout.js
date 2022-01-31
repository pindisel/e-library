import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Sidebar } from ".";

const LayoutStyle = styled("div")({
  width: "100%",
});

const RootStyle = styled("div")({
  display: "flex",
});

const Layout = ({ children }) => {
  return (
    <RootStyle>
      <Sidebar />
      <LayoutStyle>
        <Box sx={{ m: 2, mt: 10 }}>{children}</Box>
      </LayoutStyle>
    </RootStyle>
  );
};

export default Layout;
