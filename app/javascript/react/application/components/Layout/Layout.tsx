import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import routes from '../../routes'
// import { urlToList } from '../../../../utils/_utils'
// import flattenRoutes from '../../../../utils/flattenRoutes'
// import { hasRoles } from '../../../../utils/authorization'
import { AppBar, Avatar, Box, Container, Menu, MenuItem, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { theme } from '@/utils/theme'
import './Layout.sass'
import useI18n from '@/utils/useI18n'
import { type UserType } from '@/react/types'
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import AvatarMenu from '../AvatarMenu/AvatarMenu'

interface LayoutProps {
  children: React.ReactNode
  user: UserType;
}

const Layout: React.FC<LayoutProps> = props => {
  const {
    children,
    user
  } = props
  /*
   * Hooks
   */

  const { t } = useI18n()
  // const location = useLocation()
  const history = useNavigate()
  const onRouteChange = (key) => { history(key) }
  // const pathname = location.pathname
  // const activeKeys = urlToList(pathname)

  // const rts = flattenRoutes(routes).filter(r => r.component).filter(route => route.access ? hasRoles(user, route.access) : true)
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Container maxWidth='md' sx={{ flexGrow: 1, mt: 2 }} disableGutters className='navbar-container'>
              <Typography color='secondary' variant="h6" sx={{ flexGrow: 1 }} className='project-name'>
                <a onClick={() => { history('/') }}>Afterwatch</a>
              </Typography>
              <div className='ml-auto'>
                <Stack direction='row' spacing={4} className='links-stack'>
                  <Typography color='secondary' className='nav-link' onClick={() => { onRouteChange('/movies') }}>{t('words.movies')}</Typography>
                  <Typography color='secondary' className='nav-link' onClick={() => { onRouteChange('/tv') }}>{t('words.tv')}</Typography>
                  <AvatarMenu user={user} />
                </Stack>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {children}
      </Box>
    </ThemeProvider>
  )
}

export default Layout
