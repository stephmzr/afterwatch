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

export interface MovieType {
  id: ID
  title: string
  overview: string
  releaseDate: Date
  posterPath: string
}
