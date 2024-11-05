import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';

const MESSAGES_SLICE_NAME = 'messages';

const initialState = {
  openedGroup: null,
  messages: [],
  hasMoreMessages: true,
  isMessageAdded: false,
  isMoreMessagesLoadedForNotScrollDown: false,
  getMessagesError: null,
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
    deletedGroupError: (state, { payload }) => {
      state.deleteGroupError = payload;
    },
    clearDeleteGroupError: state => {
      state.updateGroupError = null;
    },
    getGroupMessagesSuccess: (state, { payload }) => {
      state.isMoreMessagesLoadedForNotScrollDown = false;
      state.hasMoreMessages = true;
      state.getMessagesError = null;
      state.openedGroup = payload.group;
      if (payload.length < CONSTANTS.MESSAGES_LIMIT) {
        state.hasMoreMessages = false;
      }
      state.messages = [];
      state.messages.push(...payload.messages.reverse());
    },
    getGroupMessagesError: (state, { payload }) => {
      state.getMessagesError = payload;
    },
    getMoreGroupMessagesSuccess: (state, { payload }) => {
      state.isMoreMessagesLoadedForNotScrollDown = true;
      state.getMessagesError = null;
      if (payload.length < CONSTANTS.MESSAGES_LIMIT) {
        state.hasMoreMessages = false;
      }
      state.messages = [...payload.reverse(), ...state.messages];
    },
    getMoreGroupMessagesError: (state, { payload }) => {
      state.getMessagesError = payload;
    },
    clearGetMessagesError: state => {
      state.getMessagesError = null;
    },
    newMessageSuccess: (state, { payload }) => {
      state.isMoreMessagesLoadedForNotScrollDown = false;
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
  getMoreGroupMessagesSuccess,
  getMoreGroupMessagesError,
  clearGetMessagesError,
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
