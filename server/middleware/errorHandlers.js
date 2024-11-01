const { ValidationError } = require('yup');

module.exports.validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors = err.errors.map(e => ({ status: 422, massage: e }));
    return res.status(422).send({ error: errors });
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status ?? 500;

  res.status(status).send({
    errors: [
      {
        status,
        title: err.message ?? 'Server Error',
      },
    ],
  });
};
