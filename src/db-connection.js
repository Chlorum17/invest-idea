'use strict';

const mongoose = require('mongoose');

async function connectToMongoDB(mongoURI) {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    return connection;
  } catch (error) {
    throw new Error(`Connect to mongo failed: ${error}`);
  }
}

module.exports = connectToMongoDB;
