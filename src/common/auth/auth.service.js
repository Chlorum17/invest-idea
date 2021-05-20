'use strict';

const jwt = require('jwt-promisify');

const userService = require('../../entities/user/user.service');

const service = {
  async login({ _id }) {
    const accessToken = await this.issueToken(_id);

    return accessToken;
  },

  async isUser({ email }) {
    const user = await userService.findOne({ email });
    return user;
  },

  isMatchPassword(inputPassword, userPassword) {
    const matchPassword = inputPassword === userPassword;
    return matchPassword;
  },

  async issueToken(userId) {
    const token = await jwt.sign(
      { _id: userId },
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
