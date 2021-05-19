'use strict';

const aqp = require('api-query-params');

const investIdeaService = require('./invest-idea.service');

const controller = {
  async find(req, res) {
    try {
      const investIdeas = await investIdeaService.find(aqp(req.query));

      if (investIdeas.length < 1)
        res.status(404).json({ message: 'No Invest Ideas found' });

      return res.status(200).json(investIdeas);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  },

  async findById(req, res) {
    try {
      const investIdea = await investIdeaService.findById(req.params._id);

      if (!investIdea)
        return res.status(404).json({ message: 'No Invest Idea found' });

      return res.status(200).json(investIdea);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },

  async create(req, res) {
    try {
      const investIdea = await investIdeaService.create(req.body);
      return res.status(201).json(investIdea);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },
};

module.exports = controller;
