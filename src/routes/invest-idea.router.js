'use strict';

const router = require('express').Router();

const investIdeaController = require('../entities/invest-idea/invest-idea.controller');

const isIdeaValidator = require('../common/is-idea.validator');

const createIdeaValidator = require('../entities/invest-idea/validation/create-idea.validator');

router.get('/', investIdeaController.find);
router.get('/:ideaId', investIdeaController.findById);

router.post(
  '/create',
  createIdeaValidator.validate,
  investIdeaController.create,
);

router.use('*/:ideaId', isIdeaValidator.isIdea);
router.get('/getChart/:ideaId', investIdeaController.getIdeaIncomeChart);
router.patch(
  '/update/:ideaId',
  investIdeaController.findByIdAndUpdateIncomeHistory,
);

module.exports = router;
