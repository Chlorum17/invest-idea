'use strict';

const router = require('express').Router();

const investIdeaController = require('../entities/invest-idea/invest-idea.controller');

router.get('/', investIdeaController.find);

router.get('/:ideaId', investIdeaController.findById);

router.get('/getChart/:ideaId', investIdeaController.getIdeaIncomeChart);

router.post('/create', investIdeaController.create);

router.patch(
  '/update/:ideaId',
  investIdeaController.findByIdAndUpdateIncomeHistory,
);

module.exports = router;
