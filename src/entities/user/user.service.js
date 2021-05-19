'use strict';

const UserModel = require('./user.model');

const service = {
  async register(createUserDto) {
    const newUser = await UserModel.create(createUserDto);
    return newUser;
  },

  async findOne(filter) {
    const user = await UserModel.findOne(filter);
    return user;
  },

  async findById(id) {
    const user = await UserModel.findById(id);
    return user;
  },
};

module.exports = service;
