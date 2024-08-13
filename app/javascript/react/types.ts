import { Divider } from '@mui/material';
export type ID = string | number

export interface FileType {
  id: number
  url: string
}

export interface UserType {
  id: ID
  firstName: string
  lastName: string
  fullName: string
  email: string
  createdAt: Date
  currentSignInAt?: Date
  lastRequestAt?: Date
  versionsToArray: VersionType[]
}

export interface PaginationType {
  total: number
  page: number
  totalPage: number
  perPage: number
}

export interface AuthorizationField {
  canDestroy: boolean
  canEdit: boolean
  canShow: boolean
  canUpdate: boolean
}

export interface VersionType {
  changes: string[]
  createdAt: Date
  event: string
  user: UserType
}

// Define a base interface for shared properties
export interface BaseMediaType {
  id: ID
  title: string
  overview: string
  releaseDate: Date
  posterPath: string
  originalLanguage: string
  mediaType: string
  genres: GenreType[]
  credits: CreditType
  runtime: number
  tagline: string
  voteAverage: number
  watchProviders: WatchProviderType
}

export interface GenreType {
  id: ID
  name: string
}

// Extend the base interface for specific media types
export interface MovieType extends BaseMediaType {
  type: string
}

export interface TvShowType extends BaseMediaType {
  type: string
}

// Union type for flexibility
export type MediaType = MovieType | TvShowType

export interface CreditType {
  id: ID
  cast: CastType[]
  crew: CrewType[]
  director: CrewType
}

export interface CastType {
  id: ID
  name: string
  profilePath: string
  character: string
}

export interface CrewType {
  id: ID
  name: string
  profilePath: string
  job: string
}

export interface WatchProviderType {
  id: ID
  providers: {
    id: ID
    providerName: string
    logoPath: string
  }
}
