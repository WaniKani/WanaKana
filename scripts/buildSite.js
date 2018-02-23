const path = require('path');
const {
  exec, exit, cp, test,
} = require('shelljs');
const {
  SITE_JS_DIR, OUT_DIR, PACKAGE_NAME, log, logError, execSuccess,
} = require('./util.js');

const BROWSER_BUNDLES = [
  path.resolve(OUT_DIR, 'umd', `${PACKAGE_NAME}.min.js`),
  path.resolve(OUT_DIR, 'umd', `${PACKAGE_NAME}.js`),
  path.resolve(OUT_DIR, 'umd', `${PACKAGE_NAME}.min.js.map`),
];

const exists = (file) => test('-e', file);

function buildSite(version) {
  if (BROWSER_BUNDLES.some((bundle) => !exists(bundle))) {
    logError('Compiled browser bundles not found. Have the dist packages been built?');
    exit(1);
  }

  BROWSER_BUNDLES.forEach((bundle) => {
    if (execSuccess(cp('-Rf', bundle, SITE_JS_DIR))) {
      exec('git add gh-pages');
      log(`Copied ${bundle} to to gh-pages`);
    } else {
      logError(`Failed to copy ${bundle} bundle to gh-pages`);
      exit(1);
    }
  });
  return true;
}

module.exports = buildSite;
