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
  MediaType: string
}

// Extend the base interface for specific media types
export interface MovieType extends BaseMediaType {
  type: string
  // Movie-specific properties can be added here
}

export interface TvShowType extends BaseMediaType {
  type: string
}

// Union type for flexibility
export type MediaType = MovieType | TvShowType
