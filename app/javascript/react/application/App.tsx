import React from "react";
import AppLayout from './components/Layout';
import TranslationProvider from "../../utils/TranslationProvider";
import AppProvider from "../shared/components/AppProvider";

import '../../assets/stylesheets/global.sass';
import './assets/stylesheets/global.sass';
import '../../../../node_modules/@9troisquarts/inline-filters/dist/style.css';

type AppProps = {}

const App: React.FC<AppProps> = (props) => {
  return (
    <AppProvider {...props}>
      <AppLayout />
    </AppProvider>
  )
}

export default TranslationProvider(App);
