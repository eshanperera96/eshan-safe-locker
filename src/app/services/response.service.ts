import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Response} from '../model/response';
import {FirebaseService} from './firebase.service';
import {Message, MessageType} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private firebaseService: FirebaseService) {
  }

  public generateMessage(text: string, type: MessageType): Message {
    const message: Message = {
      body: text,
      type,
      timestamp: new Date().toISOString()
    };
    message.isNotify = this.isNotify(type);
    return message;
  }

  private isNotify(messageType: MessageType): boolean {
    switch (messageType) {
      case MessageType.ALERT:
        return true;
      case MessageType.INFO:
        return true;
      case MessageType.WARN:
        return true;
      default:
        return false;
    }
  }

  public responseUser(user: User, responseMsg: string, messageType: MessageType, payload: any): void {
    const response: Response = {
      payload,
      message: this.generateMessage(responseMsg, messageType),
      status: true
    };
    this.firebaseService.setObject(`users/${user._id}/messages`, response);
  }
}
