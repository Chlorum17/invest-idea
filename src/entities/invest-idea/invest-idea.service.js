'use strict';

const InvestIdeaModel = require('./invest-idea.model');

const sanitizeInvestIdea = require('./invest-idea.sanitize');

const service = {
  async find({ filter, skip, limit, sort }) {
    const investIdeas = await InvestIdeaModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    return investIdeas.map(sanitizeInvestIdea);
  },

  async findById(id) {
    const investIdea = await InvestIdeaModel.findById(id).populate({
      path: 'IdeaRating',
      select: 'rating',
    });
    return sanitizeInvestIdea(investIdea);
  },

  async create(createIdeaDto) {
    const currentIncome = this._currentIncomeCalc(createIdeaDto);

    const predictedIncome = this._predictedIncomeCalc(createIdeaDto);

    const ideaRealization = this._ideaRealizationCalc(
      predictedIncome,
      currentIncome,
    );
    const investIdea = {
      ...createIdeaDto,
      predictedIncome,
      currentIncome,
      ideaRealization,
    };

    const existingInvestIdea = await InvestIdeaModel.create(investIdea);

    return sanitizeInvestIdea(existingInvestIdea);
  },

  _predictedIncomeCalc({ investType, openingPrice, closingPrice }) {
    if (investType === 'Продажа') {
      const predictedIncome =
        (openingPrice - closingPrice) / (openingPrice / 100);
      return predictedIncome;
    }
    const predictedIncome = closingPrice / (openingPrice / 100) - 100;
    return predictedIncome;
  },

  _currentIncomeCalc({ investType, openingPrice, currentPrice }) {
    if (investType === 'Продажа') {
      const currentIncome = 100 - currentPrice / (openingPrice / 100);
      return currentIncome;
    }
    const currentIncome = currentPrice / (openingPrice / 100) - 100;
    return currentIncome;
  },

  _ideaRealizationCalc(predictedIncome, currentIncome) {
    const ideaRealization = currentIncome / (predictedIncome / 100);
    return ideaRealization;
  },
};

module.exports = service;
