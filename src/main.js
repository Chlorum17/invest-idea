'use strict';

require('dotenv').config();

const { serverPort, mongoURI } = require('./common/config');

const startServer = require('./server');

const connectToMongoDB = require('./db-connection');

const logger = require('../logger');

async function bootstrap() {
  try {
    startServer(serverPort);
    logger.info(`Server started at port ${serverPort}`);

    await connectToMongoDB(mongoURI);
    logger.info(`Connected to MongoDB`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
