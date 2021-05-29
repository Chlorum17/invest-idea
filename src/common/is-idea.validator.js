'use strict';

const investIdeaService = require('../entities/invest-idea/services/invest-idea.service');

const middleware = {
  async isIdea(req, res, next) {
    try {
      const investIdea = await investIdeaService.findById(req.params.ideaId);

      if (investIdea === null) {
        return res.status(404).json({
          message: `Idea with id: ${req.params.ideaId} doesn't exist`,
        });
      }

      return next();
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
};

module.exports = middleware;
