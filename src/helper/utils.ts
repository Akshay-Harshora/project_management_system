import { UsersOperation } from "./enum";
import { Messages } from "./messages";

export function getDateAndTime(): Date {
  return new Date();
}

export function getMessageByCode(messageKey: string): string {
  switch (messageKey) {
    case UsersOperation.LOGIN:
      return Messages.UserMessages.Login;

    default:
      return Messages.InternalServerError;
  }
}