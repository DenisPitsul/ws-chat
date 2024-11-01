const mongoose = require('mongoose');
const env = process.env.NODE_ENV ?? 'development';
const { host, port, dbName } = require('./../configs/mongoDBConfig.json')[env];

mongoose
  .connect(`mongodb://${host}:${port}/${dbName}`)
  .then(() => console.log('Connection Ok'))
  .catch(err => console.log('err', err));

process.on('SIGINT', async () => {
  mongoose.disconnect().then(() => {
    console.log('Mondoose disconnect');
    process.exit();
  });
});
module.exports.Message = require('./message');
module.exports.User = require('./user');
module.exports.Group = require('./group');
