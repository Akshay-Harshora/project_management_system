import { UsersOperation } from "./enum";
import { Messages } from "./messages";

export function getDateAndTime(): Date {
  return new Date();
}

export function getMessageByCode(messageKey: string): string {
  switch (messageKey) {
    case UsersOperation.LOGIN:
      return Messages.UserMessages.Login;

    case UsersOperation.REGISTER:
      return Messages.UserMessages.register;

    case UsersOperation.FETCHED:
      return Messages.UserMessages.Fetched;

    default:
      return Messages.InternalServerError;
  }
}