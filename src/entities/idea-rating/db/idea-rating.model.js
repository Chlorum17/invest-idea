'use strict';

const { Schema, model } = require('mongoose');

const ideaRatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    idea: { type: Schema.Types.ObjectId, ref: 'invest-idea', required: true },
    rating: { type: String, enum: ['like', 'dislike'], required: true },
  },
  { timestamps: true },
);

const IdeaRatingModel = model('idea-rating', ideaRatingSchema);

module.exports = IdeaRatingModel;
