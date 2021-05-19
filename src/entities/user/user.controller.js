'use strict';

const userService = require('./user.service');

const controller = {
  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },
};

module.exports = controller;
