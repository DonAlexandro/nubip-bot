# NUBiP Bot

## Description

Telegram bot for Ukranian university NULES. [Official website](https://nubip.edu.ua) - place where we grab all necessary information.

## Available NPM scripts

### Common for bot and scrapper

`doc` - generate API documentatio
`test` - run tests
`test:coverage` - run tests with coverage table

### For scrapper

`start` - build a project once
`dev` - start a project for development

## Available bash scripts

`dev-build` - build images and start containers in development mode
`dev-start` - start containers in development mode
`dev-down` - remove images, network and containers which was started in development mode

`prod-build` - build images and start containers in production mode
`prod-start` - start containers in production mode
`prod-down` - remove images, network and containers which was started in production mode

`runAllTest [options]` - run unit tests for bot and scrapper, --withCoverage option run tests with coverage table
