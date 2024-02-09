import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    email
    fullName
    active
    lastRequestAt
    createdAt
    firstName
    lastName
  }
`;

export const PAGINATION_FRAGMENT = gql`
  fragment Pagination on Pagination {
    page
    perPage
    total
  }
`;

export const VERSION_FRAGMENT = gql`
  fragment VersionInfo on Version {
      event
      createdAt
      user {
        ... on User {
          id
          firstName
          lastName
        }
        ... on User {
          id
          firstName
          lastName
        }
      }
      changes
    }
`;