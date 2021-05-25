'use strict';

const authService = require('./auth.service');

const controllers = {
  async login(req, res) {
    try {
      const user = await authService.isUser(req.body.email);

      if (user === null) {
        return res.status(404).json({
          message: `User with email: ${req.body.email} doesn't exist`,
        });
      }

      const mathedPassword = authService.isMatchPassword(
        req.body.password,
        user.password,
      );

      if (mathedPassword === false) {
        return res.status(401).json({ message: 'Wrong password' });
      }

      const accessToken = await authService.issueToken(user._id);

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  },
};

module.exports = controllers;
