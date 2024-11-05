const { Group } = require('../models');

module.exports.getAllGroups = async (req, res, next) => {
  const {
    pagination: { page, limit, skip },
    query,
  } = req;

  const where = {};
  if (query.groupName) {
    where.name = { $regex: query.groupName, $options: 'i' };
  }

  try {
    const totalGroups = await Group.countDocuments(where);
    const totalPages = Math.ceil(totalGroups / limit);

    const foundGroups = await Group.find(where)
      .select('-updatedAt')
      .limit(limit)
      .skip(skip);

    res.status(200).send({ page, totalPages, data: foundGroups });
  } catch (err) {
    next(err);
  }
};
