'use strict';

const incomeCalcService = {
  predictedIncomeCalc({ investType, openingPrice, closingPrice }) {
    if (investType === 'Продажа') {
      const predictedIncome =
        (openingPrice - closingPrice) / (openingPrice / 100);
      return predictedIncome;
    }
    const predictedIncome = closingPrice / (openingPrice / 100) - 100;
    return predictedIncome;
  },

  currentIncomeCalc({ investType, openingPrice, currentPrice }) {
    if (investType === 'Продажа') {
      const currentIncome = 100 - currentPrice / (openingPrice / 100);
      return currentIncome;
    }
    const currentIncome = currentPrice / (openingPrice / 100) - 100;
    return currentIncome;
  },

  ideaRealizationCalc(predictedIncome, currentIncome) {
    const ideaRealization = currentIncome / (predictedIncome / 100);
    return ideaRealization;
  },
};

module.exports = incomeCalcService;
