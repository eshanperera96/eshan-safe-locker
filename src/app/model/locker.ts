import {User} from './user';

export interface  Locker {
  isOpen: boolean;
  tryingToOpen: boolean;
  users: Array<User>;
  _id?: string;
}


