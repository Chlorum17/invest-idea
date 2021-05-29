'use strict';

const router = require('express').Router();

const ideaRatingController = require('../entities/idea-rating/idea-rating-controller');

const authMiddleware = require('../common/auth/auth.middleware');

const ideaMiddleware = require('../entities/invest-idea/is-idea.middleware');

const voteGuard = require('../entities/idea-rating/validation/idea-rating.guard');

router.post('/vote', voteGuard.validate);

router.use('*/:ideaId', ideaMiddleware.isIdea);

router.get('/:ideaId', ideaRatingController.getRating);

router.use(authMiddleware.authenticate);

router.post('/vote', ideaRatingController.vote);

module.exports = router;
