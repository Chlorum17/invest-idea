'use strict';

const router = require('express').Router();

const ideaRatingController = require('../entities/idea-rating/idea-rating-controller');
const authGuard = require('../common/auth/auth.guard');
const isIdeaValidator = require('../common/is-idea.validator');
const voteValidator = require('../entities/idea-rating/validation/idea-rating.validator');

router.get('/:ideaId', isIdeaValidator.isIdea, ideaRatingController.getRating);

router.post(
  '/vote/:ideaId',
  authGuard.authenticate,
  voteValidator.validate,
  isIdeaValidator.isIdea,
  ideaRatingController.vote,
);

module.exports = router;
