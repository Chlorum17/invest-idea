'use strict';

const jwt = require('jwt-promisify');

const userService = require('../../entities/user/user.service');

const service = {
  async login({ email, password }) {
    const user = await userService.findOne({ email });
    if (!user) return { status: 404, message: 'User not found' };

    const matchPassword = password === user.password;
    if (!matchPassword) return { status: 401, message: 'Wrong password' };

    const accessToken = await this.issueToken(user._id);

    return {
      status: 200,
      message: {
        accessToken,
      },
    };
  },

  async issueToken(userId) {
    const token = await jwt.sign(
      { id: userId },
      process.env.INV_IDEA_ACC_TOKEN_SECRET,
      { expiresIn: process.env.INV_IDEA_ACC_TOKEN_EXP },
    );
    return token;
  },

  async verifyAccessToken(token) {
    const verifiedToken = await jwt.verify(
      token,
      process.env.INV_IDEA_ACC_TOKEN_SECRET,
    );
    return verifiedToken;
  },

  parseBearerToken({ authorization }) {
    if (!authorization)
      return { status: 400, message: 'Access token is missing' };
    return authorization.replace('Bearer ', '');
  },
};

module.exports = service;
