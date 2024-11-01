const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    body: {
      type: String,
      match: /^.*\S.*$/,
      minLength: 1,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
    groupId: {
      type: mongoose.ObjectId,
      ref: 'Group',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
