import { configureStore } from '@reduxjs/toolkit';
import messengerReducer from './messengerSlice';

export const store = configureStore({
  reducer: {
    messenger: messengerReducer,
  },
});