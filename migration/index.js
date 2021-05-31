'use strict';

const mongoose = require('mongoose');
const connnectToMongoDB = require('../src/db-connection');
const { mongoURI } = require('../config');

const investIdeasData = require('./invest-ideas.json');
const investIdeaService = require('../src/entities/invest-idea/services/invest-idea.service');

const usersData = require('./users.json');
const userService = require('../src/entities/user/user.service');

// const ideaRatingData = require('./idea-ratings.json');

const logger = require('../logger');

async function dropCollections(collectionsArray) {
  try {
    await Promise.all(
      collectionsArray.map(async (collection) => {
        await mongoose.connection.db.dropCollection(collection);
      }),
    );
    return logger.info('Drop collections succeess');
  } catch (error) {
    return logger.error(error);
  }
}

async function createRecords(entitiesArray, callback) {
  try {
    await Promise.all(
      entitiesArray.map(async (entity) => {
        await callback(entity);
      }),
    );

    return logger.info('Create records succeess');
  } catch (error) {
    return logger.error(error);
  }
}

async function migrate() {
  try {
    await connnectToMongoDB(mongoURI);
    await dropCollections(['invest-ideas', 'users', 'idea-ratings']);

    await createRecords(investIdeasData, investIdeaService.create);
    await createRecords(usersData, userService.register);

    await mongoose.connection.close();
    return logger.info('Migration succeess');
  } catch (error) {
    return logger.error(error);
  }
}

migrate();
