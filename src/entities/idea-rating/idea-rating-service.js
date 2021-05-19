'use strict';

const IdeaRatingModel = require('./idea-rating.model');

const authService = require('../../common/auth/auth.service');

const service = {
  async getRating({ ideaId }) {
    const likes = await IdeaRatingModel.countDocuments({
      $and: [{ idea: ideaId }, { rating: 'Верю' }],
    });
    const dislikes = await IdeaRatingModel.countDocuments({
      $and: [{ idea: ideaId }, { rating: 'Не верю' }],
    });
    return { likes, dislikes };
  },

  async findOne(filter) {
    const ideaRating = await IdeaRatingModel.findOne(filter);
    return ideaRating;
  },

  async vote(headers, body) {
    const { ideaId, rating } = body;

    const token = authService.parseBearerToken(headers);
    const { _id } = await authService.verifyAccessToken(token);

    const ideaRating = await this.findOne({ user: _id, idea: ideaId });

    if (ideaRating) return { status: 409, message: 'Вы уже проголосовали' };

    await IdeaRatingModel.create({
      user: _id,
      idea: ideaId,
      rating,
    });

    const updatedRating = await this.getRating(ideaId);
    return { status: 201, message: updatedRating };
  },
};

module.exports = service;
