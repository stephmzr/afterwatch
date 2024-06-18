import React from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import GlobalSearch from '../../pages/HomePage/components/GlobalSearch'

const MuiNavbar = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
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
  )
}

export default MuiNavbar
