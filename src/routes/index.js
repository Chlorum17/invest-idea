'use strict';

const express = require('express');

const cors = require('cors');

const router = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const investIdeaRouter = require('./invest-idea.router');
const ideaRatingRouter = require('./idea-rating.router');

router.use(
  cors({
    origin: 'http://example.com',
  }),
);

router.use(express.json());

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/invest-ideas', investIdeaRouter);
router.use('/idea-rating', ideaRatingRouter);

module.exports = router;
