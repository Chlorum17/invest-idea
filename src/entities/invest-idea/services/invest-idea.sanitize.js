'use strict';

const omit = require('lodash/omit');

function returnSanitizedIdea(omittedIdea) {
  const { currentIncome, predictedIncome, ideaRealization } = omittedIdea;
  return {
    ...omittedIdea,
    predictedIncome: predictedIncome.toFixed(2),
    currentIncome: currentIncome.toFixed(2),
    ideaRealization: ideaRealization > 0 ? ideaRealization.toFixed(2) : 0,
  };
}

const sanitize = {
  sanitizeIdeaInDetail(investIdea) {
    const omittedInvestIdea = omit(investIdea.toObject(), [
      '__v',
      'createdAt',
      'updatedAt',
      '_id',
      'currentIncomeHistory',
    ]);

    return returnSanitizedIdea({
      id: investIdea._id,
      ...omittedInvestIdea,
    });
  },

  sanitizeIdeasList(investIdea) {
    const omittedInvestIdea = omit(investIdea.toObject(), [
      '__v',
      'createdAt',
      'updatedAt',
      '_id',
      'currentIncomeHistory',
      'reasonsToInvest',
      'companyBackground',
    ]);

    return returnSanitizedIdea({
      id: investIdea._id,
      ...omittedInvestIdea,
    });
  },
};

module.exports = sanitize;
