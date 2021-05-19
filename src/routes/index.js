'use strict';

const express = require('express');

const router = express.Router();

const investIdeaRouter = require('./invest-idea');

router.use(express.json());

router.use('/invest-ideas', investIdeaRouter);

module.exports = router;
