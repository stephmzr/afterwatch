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
    posterPath
    voteAverage
    credits {
      director {
        name
      }
    }
  }
`;

export const TV_SHOW_FRAGMENT = gql`
  fragment TvShowInfo on Tv {
    id
    title: name
    originalLanguage
    overview
    releaseDate: firstAirDate
    posterPath
  }
`;