import { io } from "socket.io-client";
import {
  deletedGroupError,
  deletedGroupSuccess,
  deletedMessageError,
  deletedMessageSuccess,
  getGroupMessagesError,
  getGroupMessagesSuccess,
  getMoreGroupMessagesError,
  getMoreGroupMessagesSuccess,
  newMessageError,
  newMessageSuccess,
  updatedGroupError,
  updatedGroupSuccess,
  updatedMessageError,
  updatedMessageSuccess,
} from "../store/slices/messagesSlice";
import CONSTANTS from "../constants";
import {
  createGroupError,
  createGroupSuccess,
  deleteGroupFromList,
} from "../store/slices/groupsSlice";

const {
  SOCKET_EVENTS: {
    NEW_GROUP,
    NEW_GROUP_SUCCESS,
    NEW_GROUP_ERROR,
    UPDATE_GROUP,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_ERROR,
    DELETE_GROUP,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_ERROR,
    GET_GROUP_MESSAGES,
    GET_GROUP_MESSAGES_SUCCESS,
    GET_GROUP_MESSAGES_ERROR,
    GET_MORE_GROUP_MESSAGES,
    GET_MORE_GROUP_MESSAGES_SUCCESS,
    GET_MORE_GROUP_MESSAGES_ERROR,
    NEW_MESSAGE,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_ERROR,
    UPDATE_MESSAGE,
    UPDATE_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_ERROR,
    DELETE_MESSAGE,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_ERROR,
  },
} = CONSTANTS;

const socket = io("https://ws-chat-mcql.onrender.com");

export const createGroup = (groupName) => socket.emit(NEW_GROUP, groupName);

export const updateGroup = (group) => socket.emit(UPDATE_GROUP, group);

export const deleteGroup = (groupId) => socket.emit(DELETE_GROUP, groupId);

export const getGroupMessages = (groupId) =>
  socket.emit(GET_GROUP_MESSAGES, groupId);

export const getMoreGroupMessages = (payload) =>
  socket.emit(GET_MORE_GROUP_MESSAGES, payload);

export const sendMessage = (payload) => socket.emit(NEW_MESSAGE, payload);

export const updateMessage = (payload) => socket.emit(UPDATE_MESSAGE, payload);

export const deleteMessage = (payload) => socket.emit(DELETE_MESSAGE, payload);

export const bringStoreToSocket = (store) => {
  socket.on(NEW_GROUP_SUCCESS, (payload) => {
    store.dispatch(createGroupSuccess(payload));
  });
  socket.on(NEW_GROUP_ERROR, (error) => {
    store.dispatch(createGroupError(error));
  });

  socket.on(UPDATE_GROUP_SUCCESS, (payload) => {
    store.dispatch(updatedGroupSuccess(payload));
  });
  socket.on(UPDATE_GROUP_ERROR, (payload) => {
    store.dispatch(updatedGroupError(payload));
  });

  socket.on(DELETE_GROUP_SUCCESS, (payload) => {
    store.dispatch(deletedGroupSuccess());
    store.dispatch(deleteGroupFromList(payload));
  });
  socket.on(DELETE_GROUP_ERROR, (payload) => {
    store.dispatch(deletedGroupError(payload));
  });

  socket.on(GET_GROUP_MESSAGES_SUCCESS, (payload) => {
    store.dispatch(getGroupMessagesSuccess(payload));
  });
  socket.on(GET_GROUP_MESSAGES_ERROR, (error) => {
    store.dispatch(getGroupMessagesError(error));
  });

  socket.on(GET_MORE_GROUP_MESSAGES_SUCCESS, (payload) => {
    store.dispatch(getMoreGroupMessagesSuccess(payload));
  });
  socket.on(GET_MORE_GROUP_MESSAGES_ERROR, (error) => {
    store.dispatch(getMoreGroupMessagesError(error));
  });

  socket.on(NEW_MESSAGE_SUCCESS, (payload) => {
    store.dispatch(newMessageSuccess(payload));
  });
  socket.on(NEW_MESSAGE_ERROR, (error) => {
    store.dispatch(newMessageError(error));
  });

  socket.on(UPDATE_MESSAGE_SUCCESS, (payload) => {
    store.dispatch(updatedMessageSuccess(payload));
  });
  socket.on(UPDATE_MESSAGE_ERROR, (error) => {
    store.dispatch(updatedMessageError(error));
  });

  socket.on(DELETE_MESSAGE_SUCCESS, (payload) => {
    store.dispatch(deletedMessageSuccess(payload));
  });
  socket.on(DELETE_MESSAGE_ERROR, (error) => {
    store.dispatch(deletedMessageError(error));
  });
};
