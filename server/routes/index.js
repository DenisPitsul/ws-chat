const { Router } = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const groupsRouter = require('./groupsRouter');

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/groups', groupsRouter);

module.exports = router;
