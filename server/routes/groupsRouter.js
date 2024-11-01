const { Router } = require('express');
const { groupsController } = require('../controllers');
const { auth } = require('../middleware');

const groupsRouter = Router();

groupsRouter.get('/', auth.checkToken, groupsController.getAllGroups);

module.exports = groupsRouter;
