'use strict';

const IdeaRatingModel = require('./idea-rating.model');

const genarateModelAdapter = require('../../../common/core.model-adapter');

const coreModelAdapter = genarateModelAdapter(IdeaRatingModel);

const ideaRatingModelAdapter = {
  async countDocuments(filter) {
    const count = await IdeaRatingModel.countDocuments(filter);
    return count;
  },
};

module.exports = {
  ...coreModelAdapter,
  ...ideaRatingModelAdapter,
};
