'use strict';

const { Schema, model } = require('mongoose');

const ideaSchema = new Schema(
  {
    company: { type: String, required: true },
    status: {
      type: String,
      enum: ['open', 'closed'],
      required: true,
    },
    openingPrice: { type: Number, required: true },
    closingPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    priceType: { type: String, enum: ['$', 'Р', '£', '₣'], required: true },
    investType: { type: String, enum: ['sell', 'buy'], required: true },
    openingDate: { type: Date, required: true },
    closingDate: { type: Date, required: true },
    description: { type: String, required: true },
    reasonsToInvest: { type: String, required: true },
    companyLogo: { type: String },
    companyBackground: { type: String },
    predictedIncome: { type: Number, required: true },
    currentIncome: { type: Number, required: true },
    ideaRealization: { type: Number, required: true },
    currentIncomeHistory: [
      {
        _id: false,
        value: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true },
);

const InvestIdeaModel = model('invest-idea', ideaSchema);

module.exports = InvestIdeaModel;
