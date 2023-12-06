const { forbiddenResponse } = require("../utils/response");

const adminAccessMiddleware = () => {
  return (req, res, next) => {
    if (req.user && req.user.is_admin) {
      next();
    } else {
      forbiddenResponse(res, "You are not authorized to perform this action");
    }
  };
};

module.exports = adminAccessMiddleware;
