const path = require('path');
const chalk = require('chalk');

const BASE_PACKAGE = require('../package.json');
const PACKAGE_NAME = process.env.npm_package_name;
const BIN = path.resolve('./node_modules/.bin');
const SOURCE_DIR = path.resolve('./src');
const OUT_DIR = path.resolve('./dist');
const SITE_DIR = path.resolve('./gh-pages');
const SITE_JS_DIR = path.resolve(SITE_DIR, 'assets', 'js');

const log = (message) => console.log(chalk.bold(message));
const logSuccess = (message) => console.log(chalk.green.bold(message));
const logError = (message) => console.log(chalk.red.bold(message));

const execSuccess = ({ code }) => code === 0;
const execFail = (result) => !execSuccess(result);

module.exports = {
  BASE_PACKAGE,
  PACKAGE_NAME,
  BIN,
  SOURCE_DIR,
  OUT_DIR,
  SITE_DIR,
  SITE_JS_DIR,
  log,
  logSuccess,
  logError,
  execSuccess,
  execFail,
};
