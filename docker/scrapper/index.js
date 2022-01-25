const express = require('express');
const path = require('path');

const config = require('./config');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/ErrorMiddleware');
const routes = require('./routes');
const RedisService = require('./services/RedisService');

const app = express();

app.use(express.json());

if (config.nodeEnv === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const YAML = require('yamljs');
  const swaggerDoc = YAML.load(path.join(__dirname, './api/swagger-doc.yaml'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

app.use('/api', routes);

app.use(errorMiddleware);

async function start() {
  try {
    await RedisService.openConnection();
    app.listen(config.port, () => logger.info(`Scrapper is running on port ${config.port}`));
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
}

start();
