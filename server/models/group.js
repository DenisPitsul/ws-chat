const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      match: /^.*\S.*$/,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
