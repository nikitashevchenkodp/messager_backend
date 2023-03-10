import { Types } from 'mongoose';

export interface IMessage {
  _id: Types.ObjectId;
  messageText: string;
  createdAt: Date;
  from: Types.ObjectId;
  chatId: Types.ObjectId;
}

export interface IChat {
  _id: Types.ObjectId;
  members: Array<string>;
  lastMessage: IMessage;
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  chats: Array<IChat>;
}
