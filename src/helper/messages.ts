import { register } from "module";
import { ErrorType } from "./enum";

export const ErrorMessages: Record<ErrorType, string> = {
  [ErrorType.NotFound]:
    'Requested resource not found or you do not have permission to access.',
  [ErrorType.BadRequest]: 'Invalid input provided.',
  [ErrorType.Conflict]: 'A conflict occurred with existing data.',
  [ErrorType.Unauthorized]: 'You are not authorized to perform this action.',
 
  [ErrorType.InternalServerError]:
    'There was some technical error processing this request. Please try again.',
  [ErrorType.InvalidEmail]: 'The email address provided is not valid.',
  [ErrorType.InvalidCredentials]: 'Invalid credentials',
  [ErrorType.InvalidToken]: 'Invalid or expired token',
  [ErrorType.UserNotFound]: 'User not found',
  [ErrorType.UserAlreadyExist]: 'User already exists.',
  [ErrorType.ProjectNotExist]: 'Project does not exist.',
  [ErrorType.NotProjectOwner]: 'You are not the owner of this project.'
};

export const Messages = {
  InternalServerError:
    'There was some technical error processing this request. Please try again.',  
  UserMessages: {
    Login: 'Login successful',
    register: 'Registration successful',
    Fetched: 'User details fetched successfully'
  }
};