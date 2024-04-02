import { IUser } from '../interfaces/IUser';

const SESSION = 'SESSION';

export function setSession(name: IUser) {
  sessionStorage.setItem(SESSION, name);
}

export function getSession(): IUser | null {
  return sessionStorage.getItem(SESSION) || null;
}