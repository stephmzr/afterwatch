export type ID = string | number;

export type FileType = {
  id: number;
  url: string;
}

export type UserType = {
  id: ID;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  createdAt: Date;
  currentSignInAt?: Date;
  lastRequestAt?: Date;
  versionsToArray: VersionType[]
};

export type PaginationType = {
  total: number;
  page: number;
  totalPage: number;
  perPage: number;
};

export type AuthorizationField = {
  canDestroy: boolean;
  canEdit: boolean;
  canShow: boolean;
  canUpdate: boolean;
}

export type VersionType = {
  changes: string[];
  createdAt: Date;
  event: string;
  user: UserType;
}