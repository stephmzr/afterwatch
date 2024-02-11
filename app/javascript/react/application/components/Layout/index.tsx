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
import { AppBar, Box, Container, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';

type LayoutProps = {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // votre couleur principale
    },
    secondary: {
      main: '#CCCCCC', // votre couleur secondaire
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // votre police de caractères
  },
  // vous pouvez ajouter d'autres personnalisations ici
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
      <Box>
        {/* <UserProvider
          user={user}
          refetch={refetch}
        > */}
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div">
                Afterwatch
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" sx={{ flexGrow: 1, mt: 2 }}>
            {children}
          </Container>
          <Box component="footer" sx={{ py: 2, mt: 'auto', backgroundColor: 'background.default' }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Mon Pied de Page
            </Typography>
          </Box>
        </Box>
        {/* </UserProvider> */}
      </Box>
    </ThemeProvider>

  )
};

export default Layout;
