import React from 'react'
import styles from './index.module.sass'
import classnames from 'classnames/bind'
import { Box, Container } from '@mui/material'

interface IProps {
  children: React.ReactNode
  user: any
};

const Layout: React.FC<IProps> = props => {
  const {
    children
  } = props

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" sx={{ flexGrow: 1, mt: 2 }}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout
