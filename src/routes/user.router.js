'use strict';

const router = require('express').Router();

const userController = require('../entities/user/user.controller');

router.post('/register', userController.register);

module.exports = router;
