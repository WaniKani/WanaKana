const path = require('path');
const { exit, cp, test } = require('shelljs');

const util = require('./util.js');
const {
  DEMO_DIR,
  LIB_DIR,
  PACKAGE_NAME,
  log,
  logError,
  logSuccess,
  execSuccess,
} = util;

const browserBundle = path.resolve(LIB_DIR, `${PACKAGE_NAME}.min.js`);
const copyBundle = () => cp('-Rf', browserBundle, DEMO_DIR);

log('Copying browser bundle to demo dir');

if (!test('-e', browserBundle)) {
  logError('Compiled browser bundle not found');
  exit(1);
}

if (execSuccess(copyBundle())) {
  logSuccess('Copied browser bundle to demo dir');
} else {
  logError('Failed to copy browser bundle to demo dir.');
  exit(1);
}


// log('Publishing demo and docs to github pages.');
// if (exec('git push origin `git subtree split --prefix gh-pages master`:gh-pages --force').code !== 0) {
//   logError('Publish github pages failed.');
//   exit(1);
// }
// logSuccess('Published github pages');
