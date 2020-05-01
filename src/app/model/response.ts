import {Message} from './message';

export interface Response {
  payload: any;
  message: Message;
  status: boolean;
}
