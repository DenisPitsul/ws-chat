const { Router } = require('express');
const { auth } = require('../middleware');
const { userController } = require('../controllers');

const router = Router();

router.get('/', auth.checkToken, userController.getUser);

module.exports = router;
