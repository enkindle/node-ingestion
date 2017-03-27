const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';
var tester = "tester";
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => "[" + (new Date()).toLocaleTimeString('en-US', { hour12: false }) + "]";
winston.remove(winston.transports.Console);
const logger = new (winston.Logger)({
  transports: [
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-ingestion.log`,
      json: false,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'verbose' : 'info',
      formatter: function(options) {
        // Return string will be passed to logger.
        return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ]
});

exports.logger = logger;