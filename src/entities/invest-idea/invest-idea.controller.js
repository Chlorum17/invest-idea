'use strict';

const aqp = require('api-query-params');

const sanitize = require('./services/invest-idea.sanitize');

const investIdeaService = require('./services/invest-idea.service');

const controller = {
  async find(req, res) {
    try {
      const params = aqp(req.query);
      const investIdeas = await investIdeaService.find(params);

      if (investIdeas.length < 1)
        res.status(404).json({ message: 'No Invest Ideas found' });

      const sanitizedInvestIdeas = investIdeas.map(sanitize.sanitizeIdeasList);

      return res.status(200).json(sanitizedInvestIdeas);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  },

  async findById(req, res) {
    try {
      const investIdea = await investIdeaService.findById(req.params.ideaId);
      if (!investIdea)
        return res.status(404).json({ message: 'No Invest Idea found' });

      const sanitizedInvestIdea = sanitize.sanitizeIdeaInDetail(investIdea);

      return res.status(200).json(sanitizedInvestIdea);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },

  async create(req, res) {
    try {
      const investIdea = await investIdeaService.create(req.body);

      const sanitizedInvestIdea = sanitize.sanitizeIdeaInDetail(investIdea);

      return res.status(201).json(sanitizedInvestIdea);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },

  async getIdeaIncomeChart(req, res) {
    try {
      const ideaIncomeChart = await investIdeaService.getIdeaIncomeChart(
        req.params.ideaId,
        req.query.period,
      );
      return res.status(200).json(ideaIncomeChart);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },

  async findByIdAndUpdateIncomeHistory(req, res) {
    try {
      const updatedIvestIdea =
        await investIdeaService.findByIdAndUpdateIncomeHistory(
          req.params.ideaId,
          req.body,
        );
      return res.status(200).json(updatedIvestIdea);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },
};

module.exports = controller;
