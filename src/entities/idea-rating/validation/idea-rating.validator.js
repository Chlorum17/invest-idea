'use strict';

const validateSchema = require('./idea-rating.validation-schema');

const ideaRatingGuard = {
  async validate(req, res, next) {
    try {
      const { ideaId } = req.params;
      const { rating } = req.body;
      await validateSchema.validateAsync({ ideaId, rating });
      return next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = ideaRatingGuard;
