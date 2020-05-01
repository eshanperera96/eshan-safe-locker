import {User} from './user';
import {SecreteKey} from './secrete-key';

export interface  Locker {
  isOpen: boolean;
  users: Array<User>;
  _secreteKey?: SecreteKey;
  _tryingToOpen?: boolean;
  _verifyOpen?: boolean;
  _doOpen?: boolean;
  _doLock: boolean;
  _id?: string;
}
