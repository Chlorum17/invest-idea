'use strict';

const validateSchema = require('./invest-idea.validation-schema');

const createIdeaValidator = {
  async validate(req, res, next) {
    try {
      await validateSchema.validateAsync(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = createIdeaValidator;
