// @ts-nocheck
import React from 'react'
import AntForm, { AntFormRailsNested } from "@9troisquarts/ant-form";
import { isDev } from "../../../../utils/_utils";
import TranslationProvider from "../../../../utils/TranslationProvider";
import fr from 'antd/lib/locale/fr_FR';
import graphqlClient from "../../../../utils/graphqlClient";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import { NtqToolbar, NtqToolbarProvider } from '@9troisquarts/wand';
import UserContext from '../../../../utils/UserContext';
import EnvironmentBanner from '../EnvironmentBanner';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

dayjs.locale('fr');

AntForm.configure({
  locale: 'fr',
  formProps: {
    layout: 'vertical',
  },
  actionsWrapperProps: {
    className: 'ant-form-actions-wrapper'
  }
});

AntForm.addField('nested', {
  component: AntFormRailsNested,
  showFormItemError: false,
});

type IProps = {
  user: any;
}

const { client } = graphqlClient({ url: '/graphql' });

const AppProvider: React.FC<IProps> = props => {
  const {
    environment
  } = props;
  return (
    <ConfigProvider locale={fr}>
      <NtqToolbarProvider enabled={isDev} impersonation>
        <UserContext.Provider value={props.user}>
          <BrowserRouter history={history}>
            <ApolloProvider client={client}>
              <NtqToolbar enabled={isDev} />
              <EnvironmentBanner environment={environment} />
              {props.children}
            </ApolloProvider>
          </BrowserRouter>
        </UserContext.Provider>
      </NtqToolbarProvider>
    </ConfigProvider>
  )
}

export default TranslationProvider(AppProvider);
