const express = require('express');

const config = require('./config');
const logger = require('./utils/logger');
const errorMiddleware = require('./middlewares/ErrorMiddleware');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(errorMiddleware);

app.listen(config.port, () => logger.info(`Scrapper is running on port ${config.port}`));
