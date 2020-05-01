export interface User {
  _id: string;
  type: string;
  uniqueKey: string;
  isInformTryingToOpen: boolean;
  isInformIsOpen: boolean;
}

export enum UserType {
  OWNER, BANK
}
