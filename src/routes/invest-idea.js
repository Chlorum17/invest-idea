'use strict';

const express = require('express');

const router = express.Router();

const investIdeaController = require('../entities/invest-idea/invest-idea.controller');

router.get('/', investIdeaController.find);

router.get('/:_id', investIdeaController.findById);

router.post('/', investIdeaController.create);

module.exports = router;
