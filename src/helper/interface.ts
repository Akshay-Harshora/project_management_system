import { Role } from "./enum";

export interface IResponse<T> {
  data?: T;
  message?: string;
  statusCode?: number;
  error?: string;
}

export interface UserDetails {
  email: string;
  id: number;
}