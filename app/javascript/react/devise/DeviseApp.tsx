// @ts-nocheck
import React from "react";
import { Route, Routes } from "react-router-dom";
import DeviseLayout from './components/Layout';
import routes from "./routes";
import TranslationProvider from "../../utils/TranslationProvider";
import flattenRoutes from "../../utils/flattenRoutes";
import '../../assets/stylesheets/global.sass'
import AppProvider from "../shared/components/AppProvider";

type IProps = {
  user: any;
}

const App: React.FC<IProps> = props => {
  return (
    <AppProvider {...props}>
      <DeviseLayout user={props.user}>
        <Routes>
          {flattenRoutes(routes).map(route => {
            const Component = route.component;
            return (
              <Route key={route.name} exact path={route.path} element={<Component />}/>
            )
          })}
        </Routes>
      </DeviseLayout>
    </AppProvider>
  )
}

export default TranslationProvider(App);
