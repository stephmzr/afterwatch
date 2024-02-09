//@ts-nocheck
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  ApolloContextValue,
} from '@apollo/client';
import handleNotifications from './handleNotifications';
import { camelizeKeys } from 'humps';
import {Authenticity} from "./authenticity";

const isDev = process.env.NODE_ENV === "development";

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...Authenticity.headers(),
    },
  }));
  return forward(operation);
});

const errorLink = onError((data) => {
  const { graphQLErrors, response, networkError, operation } = data;
  const recordErrors = graphQLErrors?.find(
    (f) => f.message === 'Invalid record',
  );
  if (networkError?.statusCode === 401) window.location.reload();
  if (networkError?.statusCode === 403) window.location.href = "/";
  if (networkError?.statusCode === 404) window.location.href = "/404";
  if (networkError?.statusCode === 500 && !isDev) window.location.href = "/500";
  if (recordErrors) {
    response.recordErrors = camelizeKeys(recordErrors.errors);
    response.errors = null;
    if (!response.data) response.data = {};
    response.data.recordErrors = camelizeKeys(recordErrors.errors);
    response.data[operation.operationName] = {};
  }
});

type ClientConfig = {
  url: string;
}

type GraphClientType = {
  client: any;
  requestMutation: (query: any, variables: any, context?: ApolloContextValue) => Promise<any>;
  requestQuery: (query: any, variables: any, options?: any) => Promise<any>;
}

const notify = new ApolloLink((operation, forward) =>
  forward(operation).map(data => {
    handleNotifications(data);
    return data;
  }),
);

const httpLink = (config: ClientConfig) => ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  createUploadLink({ uri: config.url }),
  createHttpLink({ uri: config.url }),
);

const graphqlClient = (config: ClientConfig): GraphClientType => {
  const client = new ApolloClient({
    uri: config.url,
    link: authLink
      .concat(notify)
      .concat(errorLink)
      .concat(httpLink(config)),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-and-network'
      },
      mutate: {
        fetchPolicy: 'network-only'
      }
    }
  });

  const requestQuery = (query: any, variables = {}, options = {}) =>
    client.query({ query, variables, ...options }).then((result) => {
      if (result.data) return result.data;
      return result;
    });

  const requestMutation = (query: any, variables = {}, context = {}) => client
    .mutate({
      mutation: query,
      variables,
      context,
      fetchPolicy: 'network-only',
    })
    .then((data) => handleNotifications(data))
    .then((result) => {
      if (result.recordErrors) {
        throw { ...(result.data || {}), errors: result.recordErrors };
      }
      if (result.data) return result.data;
      return result;
    });

  return {
    client,
    requestQuery,
    requestMutation
  }
};

export default graphqlClient;
