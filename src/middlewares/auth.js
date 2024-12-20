const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responses");
const models = require("../models");
const config = require("../config");

class Authentication {
  static async verifyToken(req, res, next) {
    try {
      if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");        
        if (parts.length === 2) {
          const scheme = parts[0];
          const credentials = parts[1];
          console.log(credentials);
          
          if (/^Bearer$/i.test(scheme)) {
            const token = credentials;
            const decoded = await jwt.verify(token, config.JWT_KEY);
    
            const user = await models.User.findById(decoded._id);
            if (!user) return errorResponse(res, 404, "User account not found");
            req.user = user;
            return next();
          }
        } else {
          return errorResponse(res, 401, "Invalid authorization format");
        }
      } else {
        return errorResponse(res, 401, "Authorization not found");
      }
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = Authentication;