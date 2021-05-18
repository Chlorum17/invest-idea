'use strict';

const pino = require('pino');

const logger = pino({
  prettyPrint: {
    colorize: true,
    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss.l o',
  },
});

module.exports = logger;
