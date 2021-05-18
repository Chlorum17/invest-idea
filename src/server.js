'use strict';

const express = require('express');

const server = express();

const router = require('./routes');

function startServer(serverPort) {
  try {
    server.use('/api', router);
    return server.listen(serverPort);
  } catch (error) {
    throw new Error(`Start express failed: ${error}`);
  }
}

module.exports = startServer;
