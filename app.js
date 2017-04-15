'use strict';

// Set the required variable for the app
const logger = require('./components/logger.js').logger;
const chokidar = require('chokidar');

// Use chokidar to watch the uploads folder for incoming files
chokidar.watch('./uploads/', {ignored: /[\/\\]\./}).on('all', (event, path) => {
  logger.info(event + " " + path);
});
