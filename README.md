# NUBiP Bot

## Description

Telegram bot for Ukranian university NULES. [Official website](https://nubip.edu.ua) - place where we grab all information.

## Available NPM scripts

### Common for bot and scrapper

`doc` - generate API documentatio <br>
`test` - run tests <br>
`test:coverage` - run tests with coverage table <br>

### For scrapper

`start` - build a project once <br>
`dev` - start a project for development <br>

## Available bash scripts

`dev-build` - build images and start containers in development mode <br>
`dev-start` - start containers in development mode <br>
`dev-down` - remove images, network and containers which was started in development mode <br>

`prod-build` - build images and start containers in production mode <br>
`prod-start` - start containers in production mode <br>
`prod-down` - remove images, network and containers which was started in production mode <br>

`runAllTest [options]` - run unit tests for bot and scrapper. Options:

1. **--withCoverage** - run tests with coverage table
