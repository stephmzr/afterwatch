import React from "react";
import AppLayout from './components/Layout';
import TranslationProvider from "../../utils/TranslationProvider";
import AppProvider from "../shared/components/AppProvider";
import routes from './routes'
import '../../assets/stylesheets/global.sass';
import './assets/stylesheets/global.sass';
import flattenRoutes from "../../utils/flattenRoutes";
import { Route, Routes } from "react-router-dom";

type AppProps = {}

const App: React.FC<AppProps> = (props) => {
  return (
    <AppProvider {...props}>
      <AppLayout>
        <Routes>
          {flattenRoutes(routes).filter(route => !route.access).map(route => {
          const Component = route.component;
            return (
              <Route key={route.name} exact path={route.path} element={<Component />}/>
            )
          })}
        </Routes>
      </AppLayout>
    </AppProvider>
  )
}

export default TranslationProvider(App);
