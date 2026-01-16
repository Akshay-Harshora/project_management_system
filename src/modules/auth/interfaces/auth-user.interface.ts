export interface AuthenticatedUser {
  id: number;
  email: string;
}

export interface AccessTokenPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}
