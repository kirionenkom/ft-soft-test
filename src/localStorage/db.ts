import Dexie, { Table } from 'dexie';
import { IUser } from '../interfaces/IUser'
import { IRoom } from '../interfaces/IRoom'

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<IUser>;
  rooms!: Table<IRoom>

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      users: '++id, name', // Primary key and indexed props
      rooms: '++id, name, messages'
    });
  }
}

export const db = new MySubClassedDexie();