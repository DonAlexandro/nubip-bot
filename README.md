# NUBiP Bot

## Description

Telegram bot for Ukranian university NULES. [Official website](https://nubip.edu.ua) - place where we grab all information.

## Available NPM scripts

### Common for bot and scrapper

`doc` - generate API documentation <br>
`test` - run tests <br>
`test:coverage` - run tests with coverage table <br>
`format` - run prettier to format code <br>
`lint` - run linter to find errors in code <br>
`husky:prepare` - install husky for commit hooks

### For scrapper

`start` - build a project once <br>
`dev` - start a project for development <br>

## Available bash scripts

`devBuild` - build images and start containers in development mode <br>
`devStart` - start containers in development mode <br>
`devDown` - remove images, network and containers which was started in development mode <br>

`prodBuild` - build images and start containers in production mode <br>
`prodStart` - start containers in production mode <br>
`prodDown` - remove images, network and containers which was started in production mode <br>

`runAllTest [options]` - run unit tests for bot and scrapper. Options:

1. **--withCoverage** - run tests with coverage table

`runAllLinters` - run [eslint](https://eslint.org/) for test and scrapper. <br>
`preCommitPreparation` - common function that will run tests, linters and formatter before changes commiting. <br>
`generateDocumentation` - generate API documentation for bot and scrapper. <br>
