'use strict';

const router = require('express').Router();

const investIdeaController = require('../entities/invest-idea/invest-idea.controller');

const authMiddleware = require('../common/auth/auth.middleware');

router.get('/', investIdeaController.find);

router.get('/:_id', investIdeaController.findById);

router.post('/', investIdeaController.create);

router.use(authMiddleware.authenticate);

module.exports = router;
