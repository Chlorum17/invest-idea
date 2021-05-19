'use strict';

const router = require('express').Router();

const investIdeaController = require('../entities/invest-idea/invest-idea.controller');

router.get('/', investIdeaController.find);

router.get('/:_id', investIdeaController.findById);

router.post('/create', investIdeaController.create);

module.exports = router;
