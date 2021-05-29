'use strict';

const joi = require('joi');

const schema = joi.object({
  ideaId: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  rating: joi.string().valid('like', 'dislike').required(),
});

module.exports = schema;
