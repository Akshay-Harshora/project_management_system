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
};

export const Messages = {
  InternalServerError:
    'There was some technical error processing this request. Please try again.',  
  UserMessages: {
    Login: 'Login successful'
  }
};