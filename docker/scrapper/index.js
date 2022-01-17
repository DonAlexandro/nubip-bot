const express = require('express');
const path = require('path');

const config = require('./config');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/ErrorMiddleware');
const routes = require('./routes');

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

app.listen(config.port, () => logger.info(`Scrapper is running on port ${config.port}`));
