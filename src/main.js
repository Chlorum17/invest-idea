'use strict';

const { serverPort, mongoURI } = require('../config');

const startServer = require('./server');

const connectToMongoDB = require('./db-connection');

const logger = require('../logger');

async function bootstrap() {
  try {
    await connectToMongoDB(mongoURI);
    logger.info(`Connected to MongoDB`);

    startServer(serverPort);
    logger.info(`Server started at port ${serverPort}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
