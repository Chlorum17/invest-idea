'use strict';

const router = require('express').Router();

const ideaRatingController = require('../entities/idea-rating/idea-rating-controller');

const authMiddleware = require('../common/auth/auth.middleware');

router.get('/:ideaId', ideaRatingController.getRating);

router.use(authMiddleware.authenticate);

router.post('/vote', ideaRatingController.vote);

module.exports = router;
