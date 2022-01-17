/**
 * Global configuration related to .env file
 */
const globalConfiguration = {
  port: process.env.PORT || 5000,
  baseUrl: process.env.BASE_URL,
  nodeEnv: process.env.NODE_ENV
};

module.exports = globalConfiguration;
