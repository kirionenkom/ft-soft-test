import { IUser } from '../interfaces/IUser';
import { IRoom } from '../interfaces/IRoom';
import { IMessage } from '../interfaces/IMessage';

const USERS = 'USERS';
const ROOMS = 'ROOMS';

function getArrayFromStorage(name: string): any[] {
  const json = localStorage.getItem(name);
  const values = JSON.parse(json);
  return values ?? [];
}

function pushToStorageArray(name: string, value: any): any[] {
  const values = getArrayFromStorage(name);
  const updatedValues = [...values, value];
  localStorage.setItem(name, JSON.stringify(updatedValues));
  return updatedValues;
}

export function getUsersFromStorage(): IUser[] {
  return getArrayFromStorage(USERS);
}

export function saveUserToStorage(user: IUser): void {
  const users = getUsersFromStorage();
  const index = users.indexOf(user);
  if (index === -1) {
    pushToStorageArray(USERS, user);
  }
}

export function getRoomsFromStorage(): IRoom[] {
  const roomsIds = getArrayFromStorage(ROOMS);
  const rooms = [];
  for (let roomId of roomsIds) {
    rooms.push(JSON.parse(localStorage.getItem(roomId)));
  }
  return rooms;
}

export function saveRoomsToStorage(room: IRoom): IRoom[] {
  saveRoomToStorage(room);
  pushToStorageArray(ROOMS, room.id);
  return getRoomsFromStorage();
}

export function getRoomFromStorage(roomId: IRoom['id']): IRoom | null {
  const json = localStorage.getItem(roomId);
  const room = JSON.parse(json);
  return room ?? null;
}

export function saveRoomToStorage(room: IRoom): void {
  localStorage.setItem(room.id, JSON.stringify(room));
}

export function addMessageToRoom(
  roomId: IRoom['id'],
  message: IMessage,
): IRoom {
  const room = getRoomFromStorage(roomId);
  const updateRoom = { ...room, messages: [...room.messages, message] };
  localStorage.setItem(room.id, JSON.stringify(updateRoom));
  return updateRoom;
}
