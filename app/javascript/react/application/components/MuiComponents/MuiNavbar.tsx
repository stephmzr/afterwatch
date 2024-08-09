import React from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const MuiNavbar = (): JSX.Element => {
  const history = useNavigate()
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
            <a onClick={() => { history('/') }}>Afterwatch</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MuiNavbar
