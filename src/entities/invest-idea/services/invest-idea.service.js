'use strict';

const InvestIdeaModel = require('../invest-idea.model');

const incomeCalc = require('./income-calc.service');
const incomeChart = require('./income-chart.service');

const service = {
  async find({ filter, skip, limit, sort }) {
    const investIdeas = await InvestIdeaModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);
    return investIdeas;
  },

  async findById({ _id }) {
    const investIdea = await InvestIdeaModel.findById(_id);
    return investIdea;
  },

  async create(createIdeaDto) {
    const currentIncome = incomeCalc.currentIncomeCalc(createIdeaDto);

    const predictedIncome = incomeCalc.predictedIncomeCalc(createIdeaDto);

    const ideaRealization = incomeCalc.ideaRealizationCalc(
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

    return existingInvestIdea;
  },

  async getIdeaIncomeChart({ ideaId }, { period }) {
    const { startOfPeriod, endOfPeriod } = incomeChart.getPeriodLimits(period);

    const { currentIncomeHistory } = await InvestIdeaModel.findById(ideaId);

    const currentIncomeChart = currentIncomeHistory.filter(
      (el) => el.date >= startOfPeriod && el.date <= endOfPeriod,
    );
    return currentIncomeChart;
  },

  async findByIdAndUpdate({ _id }, { averageValue, date }) {
    const updatedIdea = await InvestIdeaModel.findOneAndUpdate(
      { _id },
      { $addToSet: { currentIncomeHistory: { averageValue, date } } },
      {
        new: true,
      },
    );
    return updatedIdea;
  },
};

module.exports = service;
