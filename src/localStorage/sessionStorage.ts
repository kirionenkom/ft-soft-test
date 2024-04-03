import { IUser } from '../interfaces/IUser';

const SESSION = 'SESSION';

export function setSession(user: IUser) {
  sessionStorage.setItem(SESSION, JSON.stringify(user));
}

export function getSession(): IUser | null {
  return JSON.parse(sessionStorage.getItem(SESSION)) || null;
}