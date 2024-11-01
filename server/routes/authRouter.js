const { Router } = require('express');
const { authController } = require('../controllers');
const { validate } = require('../middleware');

const authRouter = Router();

authRouter.post(
  '/registration',
  validate.validateUser,
  authController.registration
);
authRouter.post('/login', authController.login);

module.exports = authRouter;
