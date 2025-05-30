import React from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { theme } from '@/utils/theme'
import './Layout.sass'
import { type UserType } from '@/react/types'
import ModernNavbar from '../Navbar/Navbar'

interface LayoutProps {
  children: React.ReactNode
  user: UserType
}

const Layout: React.FC<LayoutProps> = props => {
  const {
    children,
    user
  } = props

  return (
    <ThemeProvider theme={theme}>
      <ModernNavbar user={user} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {children}
      </Box>
    </ThemeProvider>
  )
}

export default Layout
