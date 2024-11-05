const { Router } = require('express');
const { groupsController } = require('../controllers');
const { auth, paginate } = require('../middleware');

const groupsRouter = Router();

groupsRouter.get(
  '/',
  auth.checkToken,
  paginate.paginateGroups,
  groupsController.getAllGroups
);

module.exports = groupsRouter;
