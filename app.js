'use strict';
// Configuration for folder watch
// TODO - This needs to be moved out into a configuration file
// const config = {
// 	watchFolder : 'uploads',
// 	fileType : 'pdf'
// };

// OOA specific configuration
const ooaConfig = {
	watchFolder : 'ooa-ingestion',
	fileType : 'XML'
}

// Set the required variable for the app
const logger = require('./components/logger.js').logger;
const chokidar = require('chokidar');
const path = require('path');
const folderPath = './' + ooaConfig.watchFolder + "/*" + ooaConfig.fileType;
const fs = require('fs');
const fileFolder = './' + ooaConfig.watchFolder + '/';
const xmlParser = require('xml2js').parseString;
logger.info('app started');
logger.info(fileFolder);

// Use chokidar to watch the uploads folder for incoming files
const ooaWatcher = chokidar.watch(folderPath, {
	ignored: /[\/\\]\./,
	ignoreInitial: true
});

ooaWatcher.on('add', function(filePath){
	let fileName = path.basename(filePath);
	logger.info('add function');
	if (ooaConfig.fileType === 'XML'){
		parseXML(filePath);
	}
	//else if (ooaConfig.fileType === 'pdf'){

	// }
});

function parseXML(filePath){
	logger.info('parsing xml');
	let fileData = null
	fs.readFile(filePath, 'utf8', function(err, data){
		if (err){
			return logger.error(err);
		}

		logger.info(data);

		xmlParser(data + '', function(err, result){
			//logger.info(result);
			fileData = result.Batch;
		});
		console.log(typeof fileData);
		logger.info(fileData.Documents[0].Document);
		let documents = fileData.Documents[0].Document;
		Object.keys(documents).map(function(objectKey, index){
			//logger.info(documents[objectKey]);
			logger.info(documents[objectKey].FileName[0]);
		});
	});
	//logger.info(fileName);
}