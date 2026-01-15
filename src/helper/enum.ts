export enum ErrorType {
  NotFound = 'NotFound',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Conflict = 'Conflict',
  InternalServerError = 'InternalServerError',
  InvalidEmail = 'InvalidEmail',
  InvalidCredentials = 'InvalidCredentials',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UsersOperation {
  LOGIN = 'USER_LOGIN',
}
