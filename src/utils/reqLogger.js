const { DateTime } = require("luxon");

const reqLogger = async (req, res, next) => {
  console.info(`request (${DateTime.now().toISO()}): ${req.protocol}://${req.hostname}${req.originalUrl} (${req.method})`);
  return next();
};

module.exports = reqLogger;
