'use strict';

require('dotenv').config();

const startServer = require('./server');

const connectToMongoDB = require('./db-connection');

const logger = require('../logger');

async function bootstrap() {
  try {
    startServer(process.env.INV_IDEA_SERVER_PORT);
    logger.info(`Server started at port ${process.env.INV_IDEA_SERVER_PORT}`);

    await connectToMongoDB(process.env.INV_IDEA_MONGO_URI);
    logger.info(`Connected to MongoDB`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

bootstrap();
