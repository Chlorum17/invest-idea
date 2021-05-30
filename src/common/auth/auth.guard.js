'use strict';

const authService = require('./auth.service');

const authGuard = {
  async authenticate(req, res, next) {
    try {
      const token = authService.parseBearerToken(req.headers);
      await authService.verifyAccessToken(token);
      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
};

module.exports = authGuard;
