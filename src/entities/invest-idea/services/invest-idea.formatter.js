'use strict';

const omit = require('lodash/omit');

const formatter = {
  formateIdeaInDetail(investIdea) {
    const omittedInvestIdea = omit(investIdea.toObject(), [
      '__v',
      'createdAt',
      'updatedAt',
      '_id',
      'currentIncomeHistory',
    ]);

    return this._returnFormattedIdea({
      id: investIdea._id,
      ...omittedInvestIdea,
    });
  },

  formateIdeasList(investIdea) {
    const omittedInvestIdea = omit(investIdea.toObject(), [
      '__v',
      'createdAt',
      'updatedAt',
      '_id',
      'currentIncomeHistory',
      'reasonsToInvest',
      'companyBackground',
    ]);

    return this._returnFormattedIdea({
      id: investIdea._id,
      ...omittedInvestIdea,
    });
  },

  _returnFormattedIdea(omittedIdea) {
    const { currentIncome, predictedIncome, ideaRealization } = omittedIdea;
    return {
      ...omittedIdea,
      predictedIncome: predictedIncome.toFixed(2),
      currentIncome: currentIncome.toFixed(2),
      ideaRealization: ideaRealization > 0 ? ideaRealization.toFixed(2) : 0,
    };
  },
};

module.exports = formatter;
