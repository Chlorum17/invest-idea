'use strict';

const omit = require('lodash/omit');

function sanitizeInvestIdea(investIdea) {
  const { _id, currentIncome, predictedIncome, ideaRealization } = investIdea;

  const omittedInvestIdea = omit(investIdea.toObject(), [
    '__v',
    'createdAt',
    'updatedAt',
    '_id',
  ]);

  return {
    id: _id,
    ...omittedInvestIdea,
    predictedIncome: predictedIncome.toFixed(2),
    currentIncome: currentIncome.toFixed(2),
    ideaRealization: ideaRealization > 0 ? ideaRealization.toFixed(2) : 0,
  };
}

module.exports = sanitizeInvestIdea;
