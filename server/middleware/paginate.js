const { GROUPS_LIMIT } = require('../constants');

module.exports.paginateGroups = (req, res, next) => {
  const { page = 1, results = GROUPS_LIMIT } = req.query;

  req.pagination = {
    page: Number(page),
    limit: Number(results),
    skip: (page - 1) * results,
  };

  next();
};
