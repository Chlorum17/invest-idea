'use strict';

module.exports = {
  serverPort: process.env.INV_IDEA_SERVER_PORT,
  mongoURI: process.env.INV_IDEA_MONGO_URI,
  accTokenSecret: process.env.INV_IDEA_ACC_TOKEN_SECRET,
  accTokenExpires: process.env.INV_IDEA_ACC_TOKEN_EXP,
};
