'use strict';

const { Schema, model } = require('mongoose');

const ideaRatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    idea: { type: Schema.Types.ObjectId, ref: 'Idea', required: true },
    rating: { type: String, enum: ['like', 'dislike'], required: true },
  },
  { timestamps: true },
);

const IdeaRatingModel = model('IdeaRating', ideaRatingSchema);

module.exports = IdeaRatingModel;
