export interface Message {
  body: string;
  type?: MessageType;
  timestamp?: string;
  isNotify?: boolean;
}

export enum MessageType {
  ALERT, WARN, INFO
}
