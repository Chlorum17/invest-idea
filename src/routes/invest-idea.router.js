'use strict';

const router = require('express').Router();

const investIdeaController = require('../entities/invest-idea/invest-idea.controller');

router.get('/', investIdeaController.find);

router.get('/:_id', investIdeaController.findById);

router.post('/create', investIdeaController.create);

router.get('/getChart/:ideaId', investIdeaController.getIdeaIncomeChart);

router.patch('/update/:_id', investIdeaController.findByIdAndUpdate);

module.exports = router;
