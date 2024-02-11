// @ts-nocheck
import React from 'react'
import TranslationProvider from "../../../../utils/TranslationProvider";
import graphqlClient from "../../../../utils/graphqlClient";
import dayjs from "dayjs";
import UserContext from '../../../../utils/UserContext';
import EnvironmentBanner from '../EnvironmentBanner';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

dayjs.locale('fr');

type IProps = {
  user: any;
}

const { client } = graphqlClient({ url: '/graphql' });

const AppProvider: React.FC<IProps> = props => {
  const {
    environment
  } = props;
  return (
    <UserContext.Provider value={props.user}>
      <BrowserRouter history={history}>
        <ApolloProvider client={client}>
          <EnvironmentBanner environment={environment} />
          {props.children}
        </ApolloProvider>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default TranslationProvider(AppProvider);
