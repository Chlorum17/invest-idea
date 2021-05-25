'use strict';

const aqp = require('api-query-params');

const formatter = require('./services/invest-idea.formatter');

const investIdeaService = require('./services/invest-idea.service');

const controller = {
  async find(req, res) {
    try {
      const params = aqp(req.query);
      const investIdeas = await investIdeaService.find(params);

      if (investIdeas.length < 1) {
        res.status(404).json({ message: 'No Invest Ideas found' });
      }

      const formattedInvestIdeas = investIdeas.map(
        formatter.formateIdeasList,
        formatter,
      );

      return res.status(200).json(formattedInvestIdeas);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  },

  async findById(req, res) {
    try {
      const investIdea = await investIdeaService.findById(req.params.ideaId);

      if (investIdea === null) {
        return res.status(404).json({ message: 'No Invest Idea found' });
      }

      const formattedInvestIdea = formatter.formateIdeaInDetail(investIdea);

      return res.status(200).json(formattedInvestIdea);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  },

  async create(req, res) {
    try {
      const investIdea = await investIdeaService.create(req.body);

      const formattedInvestIdea = formatter.formateIdeaInDetail(investIdea);

      return res.status(201).json(formattedInvestIdea);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
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
        .json({ message: `Internal server error: ${error.message}` });
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
        .json({ message: `Internal server error: ${error.message}` });
    }
  },
};

module.exports = controller;
