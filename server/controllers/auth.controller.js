const createHttpError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../configs/authConfig.json');

const generateAccessToken = id => {
  const payload = { id };

  return jwt.sign(payload, secret);
};

module.exports.registration = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const candidate = await User.findOne({ username });
    if (candidate) {
      return next(
        createHttpError(409, `User with username ${username} already exists`)
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const createdUser = await User.create({ username, hashPassword });

    if (!createdUser) {
      return next(createHttpError(400, 'Bad request'));
    }

    const token = generateAccessToken(createdUser._id);
    res.status(201).send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return next(
        createHttpError(404, `User with username ${username} not found`)
      );
    }

    const validPassword = bcrypt.compareSync(password, foundUser.hashPassword);
    if (!validPassword) {
      return next(createHttpError(401, 'Incorrect password entered'));
    }

    const token = generateAccessToken(foundUser._id);
    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
};
