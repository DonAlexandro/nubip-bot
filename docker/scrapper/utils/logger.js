const winston = require('winston');
const WinstonLogstash = require('winston3-logstash-transport');

const options = {
  console: {
    level: 'debug',
    handleExceptions: false,
    json: true,
    colorize: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.cli({
        colors: {
          error: 'red',
          warn: 'yellow',
          info: 'blue',
          debug: 'white',
          http: 'green',
          verbose: 'cyan'
        }
      })
    )
  }
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false
});

logger.add(
  new WinstonLogstash({
    mode: 'tcp',
    host: 'logstash',
    port: 28777
  })
);

module.exports = logger;
