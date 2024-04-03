import { IUser } from './IUser';

export interface IMessage {
  id?: string;
  sender: IUser;
  text: string;
  datetime: string;
  reply?: IMessage | null;
  image?: string |ArrayBuffer | null
}