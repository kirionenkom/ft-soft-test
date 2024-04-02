import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';
import { IRoom } from '../interfaces/IRoom';
import {
  addMessageToRoom,
  getRoomFromStorage,
  getRoomsFromStorage,
  saveRoomsToStorage,
  saveUserToStorage,
} from '../localStorage/localStorage';
import { IMessage } from '../interfaces/IMessage';
import { getSession, setSession } from '../localStorage/sessionStorage'

interface messengerSliceProps {
  rooms: IRoom[];
  currentUser: null | IUser;
  currentRoom: null | IRoom;
}

const initialState: messengerSliceProps = {
  rooms: getRoomsFromStorage(),
  currentUser: getSession(),
  currentRoom: null,
};

export const messengerSlice = createSlice({
  name: 'messenger',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      saveUserToStorage(action.payload);
      setSession(action.payload)
      state.currentUser = action.payload;
    },
    getRooms: state => {
      state.rooms = getRoomsFromStorage();
    },
    createNewRoom: (state, action: PayloadAction<string>) => {
      state.rooms = saveRoomsToStorage({
        id: nanoid(10),
        name: action.payload,
        messages: [],
      });
    },
    getRoom: (state, action: PayloadAction<IRoom['id']>) => {
      state.currentRoom = getRoomFromStorage(action.payload);
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        roomId: IRoom['id'];
        messageText: IMessage['text'];
        reply?: IMessage;
      }>,
    ) => {
      state.currentRoom = addMessageToRoom(action.payload.roomId, {
        id: nanoid(10),
        sender: state.currentUser,
        text: action.payload.messageText,
        datetime: String(new Date()),
        reply: action.payload.reply,
      });
    },
  },
});

export const { setUser, getRooms, createNewRoom, getRoom, sendMessage } =
  messengerSlice.actions;

export default messengerSlice.reducer;
