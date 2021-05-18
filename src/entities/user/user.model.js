'use strict';

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ideasRating: [{ type: Schema.Types.ObjectId, ref: 'IdeaRating' }],
  },
  { timestamps: true },
);

module.exports = model('User', userSchema);
