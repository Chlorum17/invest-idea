'use strict';

const { Schema, model } = require('mongoose');

const ideaRatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    idea: { type: Schema.Types.ObjectId, ref: 'Idea', required: true },
    rating: { type: String, enum: ['Верю', 'Не верю'], required: true },
  },
  { timestamps: true },
);

module.exports = model('IdeaRating', ideaRatingSchema);
