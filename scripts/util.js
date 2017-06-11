const path = require('path');
const chalk = require('chalk');
const { flowRight: compose } = require('lodash');

const PACKAGE_NAME = process.env.npm_package_name.toLowerCase();
const BIN = path.resolve('./node_modules/.bin');
const SOURCE_DIR = path.resolve('./src');
const OUT_DIR = path.resolve('./dist');
const LIB_DIR = path.resolve(OUT_DIR, 'lib');
const DEMO_DIR = path.resolve('./gh-pages/demo');

const consoleLog = console.log.bind(console); // eslint-disable-line no-console
const log = compose(consoleLog, chalk.bold);
const logSuccess = compose(consoleLog, chalk.green.bold);
const logError = compose(consoleLog, chalk.red.bold);

const execSuccess = ({ code }) => code === 0;
const execFail = (result) => !execSuccess(result);

module.exports = {
  PACKAGE_NAME,
  BIN,
  SOURCE_DIR,
  OUT_DIR,
  LIB_DIR,
  DEMO_DIR,
  log,
  logSuccess,
  logError,
  execSuccess,
  execFail,
};
