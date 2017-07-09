const path = require('path');
const { exit, cp, test } = require('shelljs');
const {
  SITE_JS_DIR,
  OUT_DIR,
  LIB_DIR,
  PACKAGE_NAME,
  logError,
  logSuccess,
  execSuccess,
} = require('./util.js');

const BROWSER_BUNDLE = path.resolve(OUT_DIR, LIB_DIR, `${PACKAGE_NAME}.min.js`);
const exists = (file) => test('-e', file);

function buildSite(version) {
  if (!exists(BROWSER_BUNDLE)) {
    logError('Compiled browser bundle not found. Have the dist packages been built?');
    exit(1);
  }

  if (execSuccess(cp('-Rf', BROWSER_BUNDLE, SITE_JS_DIR))) {
    logSuccess('Copied browser bundle to demo dir');
  } else {
    logError('Failed to copy browser bundle to demo dir.');
    exit(1);
  }
  exit(0);
}

module.exports = buildSite;
