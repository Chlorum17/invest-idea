'use strict';

const joi = require('joi');

const schema = joi.object({
  company: joi.string().required(),
  status: joi.string().valid('open, closed').required(),
  openingPrice: joi.number().required(),
  closingPrice: joi.number().required(),
  currentPrice: joi.number().required(),
  priceType: joi.string().valid('$', 'Р', '£', '₣').required(),
  investType: joi.string().valid('buy, sell').required(),
  openingDate: joi.date().required(),
  closingDate: joi.date().required(),
  description: joi.string().required(),
  reasonsToInvest: joi.string().required(),
  companyLogo: joi.string(),
  companyBackground: joi.string(),
});

module.exports = schema;
