/*
	A component that will take the gated percentage and array of documents in a batch, and return an array of random documents for QA
 */

const logger = require('./logger.js').logger;

let gatedArr = [];
const gatedArray = (gatedPercentage, batchArr) => {
	let tester = {};
	let batchLen = batchArr.length;
	let qaNumber = batchLen * (gatedPercentage * .01);
	logger.info('qaNumber = ' + qaNumber);
	let random = batchArr[Math.floor(Math.random() * batchLen)];
	if (qaNumber <= 1){
		gatedArr.push(1);
	}else{
		gatedArr.push(qaNumber);
	}

	gatedArr.push(random);

	return gatedArr;
};


exports.gatedArray = gatedArray;