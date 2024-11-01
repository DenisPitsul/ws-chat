const { USER_VALIDATION_SCHEMA } = require('../utils/validationSchemas');

module.exports.validateUser = async (req, res, next) => {
  const { body } = req;

  try {
    req.body = await USER_VALIDATION_SCHEMA.validate(body);
    next();
  } catch (err) {
    next(err);
  }
};
