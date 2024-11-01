const { Server } = require('socket.io');
const _ = require('lodash');
const { Message, Group } = require('./models');
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
  MESSAGES_LIMIT,
} = require('./constants');

const initSocket = httpServer => {
  const io = new Server(httpServer, { cors: { origin: '*' } });

  io.on('connection', socket => {
    socket.on(NEW_GROUP, async payload => {
      try {
        const createdGroup = await Group.create(payload);

        io.emit(NEW_GROUP_SUCCESS, createdGroup);
      } catch (err) {
        socket.emit(NEW_GROUP_ERROR, {
          error: err.message ?? 'Error creating group',
        });
      }
    });

    socket.on(UPDATE_GROUP, async ({ groupId, groupName }) => {
      try {
        const updatedGroup = await Group.findByIdAndUpdate(
          groupId,
          {
            name: groupName,
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .select('-updatedAt')
          .populate({ path: 'userId', select: '_id username' })
          .lean();

        let groupWithUser = { ...updatedGroup, user: updatedGroup.userId };

        groupWithUser = _.omit(groupWithUser, ['userId']);

        io.emit(UPDATE_GROUP_SUCCESS, groupWithUser);
      } catch (err) {
        socket.emit(UPDATE_GROUP_ERROR, {
          error: err.message ?? 'Error updating group',
        });
      }
    });

    socket.on(DELETE_GROUP, async groupId => {
      try {
        await Message.deleteMany({ groupId });
        await Group.findByIdAndDelete(groupId);
        io.emit(DELETE_GROUP_SUCCESS, groupId);
      } catch (err) {
        socket.emit(DELETE_GROUP_ERROR, {
          error: err.message ?? 'Error deleting group',
        });
      }
    });

    socket.on(GET_GROUP_MESSAGES, async groupId => {
      const currentRooms = Array.from(socket.rooms);

      currentRooms.forEach(room => {
        if (room !== socket.id) {
          socket.leave(room);
        }

        socket.join(groupId);
      });

      try {
        const foundGroup = await Group.findById(groupId)
          .select('-updatedAt')
          .populate({ path: 'userId', select: '_id username' })
          .lean();

        let groupWithUser = { ...foundGroup, user: foundGroup.userId };

        groupWithUser = _.omit(groupWithUser, ['userId']);

        const groupMessages = await Message.find({ groupId })
          .populate({ path: 'userId', select: '_id username' })
          .limit(MESSAGES_LIMIT)
          .lean()
          .sort({ createdAt: -1 });

        const preparedGroupMessages = groupMessages.map(gm => {
          let preparedGm = { ...gm, user: gm.userId };
          preparedGm = _.omit(preparedGm, ['userId']);
          return preparedGm;
        });

        socket.emit(GET_GROUP_MESSAGES_SUCCESS, {
          group: groupWithUser,
          messages: preparedGroupMessages,
        });
      } catch (err) {
        socket.emit(GET_GROUP_MESSAGES_ERROR, {
          error: err.message ?? 'Error getting group messages',
        });
      }
    });

    socket.on(NEW_MESSAGE, async ({ groupId, userId, body }) => {
      try {
        const createdMessage = await Message.create({
          groupId,
          userId,
          body,
        });

        const foundCreatedMessage = await Message.findById(createdMessage._id)
          .populate({ path: 'userId', select: '_id username' })
          .lean();

        let preparedCreatedMessage = {
          ...foundCreatedMessage,
          user: foundCreatedMessage.userId,
        };
        preparedCreatedMessage = _.omit(preparedCreatedMessage, ['userId']);

        io.to(groupId).emit(NEW_MESSAGE_SUCCESS, preparedCreatedMessage);
      } catch (err) {
        socket.emit(NEW_MESSAGE_ERROR, {
          error: err.message ?? 'Error sending message',
        });
      }
    });

    socket.on(UPDATE_MESSAGE, async ({ groupId, messageId, body }) => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          { body },
          { new: true, runValidators: true }
        )
          .populate({ path: 'userId', select: '_id username' })
          .lean();

        let preparedUpdatedMessage = {
          ...updatedMessage,
          user: updatedMessage.userId,
        };
        preparedUpdatedMessage = _.omit(preparedUpdatedMessage, ['userId']);

        io.to(groupId).emit(UPDATE_MESSAGE_SUCCESS, preparedUpdatedMessage);
      } catch (err) {
        socket.emit(UPDATE_MESSAGE_ERROR, {
          error: err.message ?? 'Error updating message',
        });
      }
    });

    socket.on(DELETE_MESSAGE, async ({ groupId, messageId }) => {
      try {
        await Message.findOneAndDelete(messageId);
        io.to(groupId).emit(DELETE_MESSAGE_SUCCESS, messageId);
      } catch (err) {
        socket.emit(DELETE_MESSAGE_ERROR, {
          error: err.message ?? 'Error deleting message',
        });
      }
    });
  });
};

module.exports = initSocket;
