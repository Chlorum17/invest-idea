'use strict';

const router = require('express').Router();

const ideaRatingController = require('../entities/idea-rating/idea-rating-controller');

const authMiddleware = require('../common/auth/auth.middleware');

router.get('/:_id', ideaRatingController.getRating);

router.use(authMiddleware.authenticate);

router.post('/', ideaRatingController.vote);

module.exports = router;
