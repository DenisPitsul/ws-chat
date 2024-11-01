import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../api';
import { getGroupMessages } from '../../api/ws';

const MESSAGES_SLICE_NAME = 'messages';

const initialState = {
  openedGroup: null,
  messages: [],
  isFetching: false,
  getError: null,
  updateGroupError: null,
  deleteGroupError: null,
  updateMessageError: null,
  deleteMessageError: null,
  updateMessage: null,
  isUpdateForm: false,
};

const messagesSlice = createSlice({
  name: MESSAGES_SLICE_NAME,
  initialState,
  reducers: {
    updatedGroupSuccess: (state, { payload }) => {
      state.updateGroupError = null;
      state.openedGroup = payload;
    },
    updatedGroupError: (state, { payload }) => {
      state.updateGroupError = payload;
    },
    clearUpdateGroupError: state => {
      state.updateGroupError = null;
    },
    deletedGroupSuccess: state => {
      state.deleteGroupError = null;
      state.openedGroup = null;
    },
    deletedGroupError: state => {
      state.deleteGroupError = null;
    },
    clearDeleteGroupError: state => {
      state.updateGroupError = null;
    },
    getGroupMessagesSuccess: (state, { payload }) => {
      state.getError = null;
      state.openedGroup = payload.group;
      state.messages = [];
      state.messages.push(...payload.messages.reverse());
    },
    getGroupMessagesError: (state, { payload }) => {
      state.getError = payload;
    },
    newMessageSuccess: (state, { payload }) => {
      state.error = null;
      state.messages.push(payload);
    },
    newMessageError: (state, { payload }) => {
      state.error = payload;
    },
    updatedMessageSuccess: (state, { payload }) => {
      state.updateMessageError = null;
      const foundMessageIndex = state.messages.findIndex(
        m => m._id === payload._id
      );
      if (foundMessageIndex !== -1) {
        state.messages.splice(foundMessageIndex, 1, payload);
      }
    },
    updatedMessageError: (state, { payload }) => {
      state.updateMessageError = payload;
    },
    clearUpdateMessageError: state => {
      state.updateMessageError = null;
    },
    deletedMessageSuccess: (state, { payload }) => {
      state.deleteMessageError = null;
      const foundMessageIndex = state.messages.findIndex(
        m => m._id === payload
      );
      if (foundMessageIndex !== -1) {
        state.messages.splice(foundMessageIndex, 1);
      }
    },
    deletedMessageError: (state, { payload }) => {
      state.deleteMessageError = payload;
    },
    clearDeleteMessageError: state => {
      state.deleteMessageError = null;
    },
    setIsUpdateForm: (state, { payload }) => {
      state.isUpdateForm = payload;
    },
    setUpdateMessage: (state, { payload }) => {
      state.updateMessage = payload;
    },
  },
});

const { reducer, actions } = messagesSlice;

export const {
  updatedGroupSuccess,
  updatedGroupError,
  clearUpdateGroupError,
  deletedGroupSuccess,
  deletedGroupError,
  clearDeleteGroupError,
  newMessageSuccess,
  newMessageError,
  getGroupMessagesSuccess,
  getGroupMessagesError,
  updatedMessageSuccess,
  updatedMessageError,
  clearUpdateMessageError,
  deletedMessageSuccess,
  deletedMessageError,
  clearDeleteMessageError,
  setIsUpdateForm,
  setUpdateMessage,
} = actions;

export default reducer;
