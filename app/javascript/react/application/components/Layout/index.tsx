import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import routes from '../../routes'
import { urlToList } from '../../../../utils/_utils'
import flattenRoutes from '../../../../utils/flattenRoutes'
import { hasRoles } from '../../../../utils/authorization'
import { Box, ThemeProvider } from '@mui/material'
import MuiNavbar from '../MuiComponents/MuiNavbar'
import { theme } from '@/utils/theme'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = props => {
  const {
    children
  } = props
  /*
   * Hooks
   */

  const intl = useIntl()
  const location = useLocation()
  const history = useNavigate()

  const onRouteChange = (key) => { history(key) }
  const pathname = location.pathname
  const activeKeys = urlToList(pathname)

  const rts = flattenRoutes(routes).filter(r => r.component).filter(route => route.access ? hasRoles(user, route.access) : true)

  return (
    <ThemeProvider theme={theme}>
        {/* <UserProvider
          user={user}
          refetch={refetch}
        > */}
        <MuiNavbar/>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {children}
        </Box>
        {/* </UserProvider> */}
    </ThemeProvider>
  )
}

export default Layout
