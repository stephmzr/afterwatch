import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";

const MuiNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography color='secondary' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Afterwatch
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )}

  export default MuiNavbar;