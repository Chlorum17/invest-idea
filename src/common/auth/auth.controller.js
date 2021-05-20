'use strict';

const authService = require('./auth.service');

const controllers = {
  async login(req, res) {
    try {
      const { status, message } = await authService.login(req.body);
      return res.status(status).json(message);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },
};

module.exports = controllers;
