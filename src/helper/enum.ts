export enum ErrorType {
  NotFound = 'NotFound',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Conflict = 'Conflict',
  InternalServerError = 'InternalServerError',
  InvalidEmail = 'InvalidEmail',
  InvalidCredentials = 'InvalidCredentials',
  InvalidToken = 'InvalidToken',
  UserNotFound = 'UserNotFound',
  UserAlreadyExist = 'UserAlreadyExist',
  ProjectNotExist = 'ProjectNotExist',
  NotProjectOwner = 'NotProjectOwner'
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UsersOperation {
  LOGIN = 'USER_LOGIN',
  FETCHED = 'USER_FETCHED',
  REGISTER = 'USER_REGISTERED'
}

export enum ProjectsOperation {
  CREATED = 'PROJECT_CREATED',
  FETCHED = 'PROJECT_FETCHED',
  UPDATED = 'PROJECT_UPDATED',
  DELETED = 'PROJECT_DELETED'
}
export enum AccessTypes {
  PUBLIC = 'public',
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum LookupDetailsCode {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum LookupCode {
  PROJCT_STATUS = 'PROJECT_STATUS',
}