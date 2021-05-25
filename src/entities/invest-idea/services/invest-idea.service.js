'use strict';

const InvestIdeaModel = require('../invest-idea.model');

const calcFieldsService = require('./calculated-fields.service');
const incomeChart = require('./income-chart.service');

const service = {
  async find({ filter, skip, limit, sort }) {
    const investIdeas = await InvestIdeaModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    return investIdeas;
  },

  async findById(ideaId) {
    const investIdea = await InvestIdeaModel.findById(ideaId);
    return investIdea;
  },

  async create(createIdeaDto) {
    const { investType, openingPrice, closingPrice, currentPrice } =
      createIdeaDto;

    const calculatedFields = calcFieldsService.getCalculatedFields({
      investType,
      openingPrice,
      closingPrice,
      currentPrice,
    });

    const investIdea = {
      ...createIdeaDto,
      ...calculatedFields,
    };

    const existingInvestIdea = await InvestIdeaModel.create(investIdea);

    return existingInvestIdea;
  },

  async getIdeaIncomeChart(ideaId, period) {
    const { startOfPeriod, endOfPeriod } = incomeChart.getPeriodLimits(period);

    const { currentIncomeHistory } = await InvestIdeaModel.findById(ideaId);
    const currentIncomeChart = currentIncomeHistory.filter(
      (el) => el.date >= startOfPeriod && el.date <= endOfPeriod,
    );

    if (currentIncomeChart.length < 1 && currentIncomeHistory.length > 0) {
      return [currentIncomeHistory[currentIncomeHistory.length - 1]];
    }

    return currentIncomeChart;
  },

  async findByIdAndUpdateIncomeHistory(ideaId, { value, date }) {
    const updatedIdea = await InvestIdeaModel.findOneAndUpdate(
      ideaId,
      { $addToSet: { currentIncomeHistory: { value, date } } },
      {
        new: true,
      },
    );
    return updatedIdea;
  },
};

module.exports = service;
