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

export const MOVIE_FRAGMENT = gql`
  fragment MovieInfo on Movie {
    id
    title
    originalLanguage
    overview
    releaseDate
  }
`;

export const TV_SHOW_FRAGMENT = gql`
  fragment TvShowInfo on TvShow {
    id
    name
    originalLanguage
    overview
    releaseDate
  }
`;