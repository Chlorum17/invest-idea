'use strict';

const express = require('express');

const router = express.Router();

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const investIdeaRouter = require('./invest-idea.router');

router.use(express.json());

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/invest-ideas', investIdeaRouter);

module.exports = router;
