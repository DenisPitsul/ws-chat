const { Group } = require('../models');

module.exports.getAllGroups = async (req, res, next) => {
  const { query } = req;

  const where = {};
  if (query.groupName) {
    where.name = { $regex: query.groupName, $options: 'i' };
  }

  try {
    const foundGroups = await Group.find(where).select('-updatedAt');

    res.status(200).send({ data: foundGroups });
  } catch (err) {
    next();
  }
};
