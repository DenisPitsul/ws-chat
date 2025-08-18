const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { secret } = require("../configs/authConfig");

module.exports.checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      next(createHttpError(403, "User is not authorized"));
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (err) {
    next(err);
  }
};
