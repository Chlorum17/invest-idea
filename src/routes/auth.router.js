'use strict';

const router = require('express').Router();

const authController = require('../common/auth/auth.controller');

router.post('/login', authController.login);

module.exports = router;
