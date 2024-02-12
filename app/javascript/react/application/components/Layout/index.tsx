import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useIntl } from "react-intl";
import routes from "../../routes";
import { urlToList } from '../../../../utils/_utils';
import { USER_FRAGMENT } from '../../../../utils/fragments';
import { gql, useQuery } from '@apollo/client';
import { UserType } from '../../../types';
import flattenRoutes from '../../../../utils/flattenRoutes';
import { hasRoles } from '../../../../utils/authorization';
import { UserProvider } from '../../../../utils/providers/UserProvider';
import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import MuiButton from '../MuiComponents/MuiButton';
import MuiNavbar from '../MuiComponents/MuiNavbar';

type LayoutProps = {
  children: React.ReactNode;
}

let theme = createTheme({
  palette: {
    primary: {
      main: '#7D7D7D',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

const Layout: React.FC<LayoutProps> = props => {
  const {
    children
  } = props;
  /*
   * Hooks
   */

  const intl = useIntl()
  const location = useLocation()
  const history = useNavigate()

  const onRouteChange = (key) => history(key)
  const pathname = location.pathname;
  const activeKeys = urlToList(pathname)
  
  const rts = flattenRoutes(routes).filter(r => r.component).filter(route => route.access ? hasRoles(user, route.access) : true)

  /*
   * Render
   */

  return (
    <ThemeProvider theme={theme}>
        {/* <UserProvider
          user={user}
          refetch={refetch}
        > */}
        <MuiNavbar/>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Container component="main" sx={{ flexGrow: 1, mt: 2 }}>
            {children}
          </Container>
        </Box>
        {/* </UserProvider> */}
    </ThemeProvider>
  )
};

export default Layout;
