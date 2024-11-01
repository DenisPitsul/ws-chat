import { configureStore } from '@reduxjs/toolkit';
import { ws } from '../api';
import authReducer from './slices/authSlice';
import groupsReducer from './slices/groupsSlice';
import messagesReducer from './slices/messagesSlice';

const store = configureStore({
  reducer: {
    authData: authReducer,
    groupsData: groupsReducer,
    messagesData: messagesReducer,
  },
});

ws.bringStoreToSocket(store);

export default store;
