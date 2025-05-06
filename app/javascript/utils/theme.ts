import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, helvetica',
    body1: {
      fontSize: '18px',
      lineHeight: '1.5'
    },
    body2: {
      fontSize: '14px',
      lineHeight: '1.5'
    }
  },
  palette: {
    primary: {
      main: '#7D7D7D'
    },
    secondary: {
      main: '#FFFFFF'
    }
  }
})
