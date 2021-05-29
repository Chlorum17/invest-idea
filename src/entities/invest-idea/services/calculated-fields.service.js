'use strict';

const calculatedFieldsService = {
  getCalculatedFields({
    investType,
    openingPrice,
    closingPrice,
    currentPrice,
  }) {
    const predictedIncome =
      investType === 'sell'
        ? this._calcPredictedIncomeSell(openingPrice, closingPrice)
        : this._calcPredictedIncomeBuy(openingPrice, closingPrice);

    const currentIncome =
      investType === 'sell'
        ? this._calcCurrentIncomeSell(openingPrice, currentPrice)
        : this._calcCurrentIncomeBuy(openingPrice, currentPrice);

    const ideaRealization = this._calcIdeaRealization(
      predictedIncome,
      currentIncome,
    );

    return { predictedIncome, currentIncome, ideaRealization };
  },

  _calcPredictedIncomeSell(openingPrice, closingPrice) {
    const predictedIncome =
      (openingPrice - closingPrice) / (openingPrice / 100);
    return predictedIncome;
  },
  _calcPredictedIncomeBuy(openingPrice, closingPrice) {
    const predictedIncome = closingPrice / (openingPrice / 100) - 100;
    return predictedIncome;
  },
  _calcCurrentIncomeSell(openingPrice, currentPrice) {
    const currentIncome = 100 - currentPrice / (openingPrice / 100);
    return currentIncome;
  },
  _calcCurrentIncomeBuy(openingPrice, currentPrice) {
    const currentIncome = currentPrice / (openingPrice / 100) - 100;
    return currentIncome;
  },

  _calcIdeaRealization(predictedIncome, currentIncome) {
    const ideaRealization = currentIncome / (predictedIncome / 100);
    return ideaRealization;
  },
};

module.exports = calculatedFieldsService;
