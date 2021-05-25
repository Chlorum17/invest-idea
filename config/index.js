'use strict';

require('dotenv').config();

module.exports = {
  serverPort: process.env.INV_IDEA_SERVER_PORT || 8080,
  mongoURI: process.env.INV_IDEA_MONGO_URI,
  accTokenSecret: process.env.INV_IDEA_ACC_TOKEN_SECRET || 'sercet',
  accTokenExpires: process.env.INV_IDEA_ACC_TOKEN_EXP || '1h',
};
