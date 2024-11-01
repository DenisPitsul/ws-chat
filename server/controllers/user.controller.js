const createHttpError = require('http-errors');
const _ = require('lodash');
const { User } = require('../models');

module.exports.getUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      next(createHttpError(404, 'User Not Found'));
    }

    const preparedUser = _.omit(foundUser.toObject(), ['hashPassword']);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};
