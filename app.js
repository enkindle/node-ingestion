'use strict';
// Configuration for folder watch
// TODO - This needs to be moved out into a configuration file
const config = {
	watchFolder : 'uploads',
	fileType : 'pdf'
};

// Set the required variable for the app
const logger = require('./components/logger.js').logger;
const chokidar = require('chokidar');
const path = require('path');
const folderPath = './' + config.watchFolder + "/*" + config.fileType;


// Use chokidar to watch the uploads folder for incoming files
chokidar.watch(folderPath, {ignored: /[\/\\]\./}).on('all', (event, filePath) => {
  let fileName = path.basename(filePath);
  parseXML(fileName);
});

function parseXML(fileName){
	logger.info(fileName);
}