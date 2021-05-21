'use strict';

const investIdeaService = require('./services/invest-idea.service');

const middleware = {
  async isIdea(req, res, next) {
    try {
      let ideaId = '';
      if (req.method === 'GET' || req.method === 'PATCH')
        ideaId = req.params.ideaId;
      if (req.method === 'POST') ideaId = req.body.ideaId;

      const investIdea = await investIdeaService.findById(ideaId);
      if (!investIdea)
        return res.status(404).json({
          message: `Idea with id: ${ideaId} doesn't exist`,
        });

      return next();
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },
};

module.exports = middleware;
