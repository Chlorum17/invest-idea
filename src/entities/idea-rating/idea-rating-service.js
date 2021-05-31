'use strict';

const ideaRatingModelAdapter = require('./db/idea-rating.model-adapter');

const authService = require('../../common/auth/auth.service');

const service = {
  async getRating(ideaId) {
    const likes = await ideaRatingModelAdapter.countDocuments({
      $and: [{ idea: ideaId }, { rating: 'like' }],
    });
    const dislikes = await ideaRatingModelAdapter.countDocuments({
      $and: [{ idea: ideaId }, { rating: 'dislike' }],
    });
    return { likes, dislikes };
  },

  async findOne(filter) {
    const ideaRating = await ideaRatingModelAdapter.findOne(filter);
    return ideaRating;
  },

  async vote(headers, body) {
    const { ideaId, rating } = body;

    const token = authService.parseBearerToken(headers);
    const { _id } = await authService.verifyAccessToken(token);

    const ideaRating = await this.findOne({ user: _id, idea: ideaId });

    if (ideaRating) {
      const currentRating = await this.getRating(ideaId);
      return currentRating;
    }

    await ideaRatingModelAdapter.create({
      user: _id,
      idea: ideaId,
      rating,
    });

    const updatedRating = await this.getRating(ideaId);
    return updatedRating;
  },
};

module.exports = service;
