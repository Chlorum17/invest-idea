'use strict';

const InvestIdeaModel = require('./invest-idea.model');

const genarateModelAdapter = require('../../../common/core.model-adapter');

const coreModelAdapter = genarateModelAdapter(InvestIdeaModel);

module.exports = {
  ...coreModelAdapter,
};
