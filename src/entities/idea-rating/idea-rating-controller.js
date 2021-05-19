'use strict';

const ideaRatingService = require('./idea-rating-service');

const controller = {
  async getRating(req, res) {
    try {
      const ideaRating = await ideaRatingService.getRating(req.params);
      return res.status(200).json(ideaRating);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },

  async vote(req, res) {
    try {
      const { status, message } = await ideaRatingService.vote(
        req.headers,
        req.body,
      );
      return res.status(status).json(message);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error: ${error}` });
    }
  },
};

module.exports = controller;