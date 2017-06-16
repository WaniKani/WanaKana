const path = require('path');
const ghpages = require('gh-pages');
const { exit, exec, cp, test } = require('shelljs');

const const {
  DEMO_DIR,
  OUT_DIR,
  LIB_DIR,
  PACKAGE_NAME,
  log,
  logError,
  logSuccess,
  execSuccess,
} = require('./util.js');

const { NEXT_VERSION } = process.env;
const DEMO_JS_DIR = path.resolve(DEMO_DIR, 'assets', 'js');
const BROWSER_BUNDLE = path.resolve(OUT_DIR, LIB_DIR, `${PACKAGE_NAME}.min.js`);
const fail = (msg) => {
  logError(msg);
  exit(1);
};

runScript();

async function runScript() {
  if (!test('-e', BROWSER_BUNDLE)) {
    fail('Compiled browser bundle not found. Have the dist packages been built?');
  }

  if (execSuccess(cp('-Rf', BROWSER_BUNDLE, DEMO_JS_DIR);)) {
    logSuccess('Copied browser bundle to demo dir');
  } else {
    fail('Failed to copy browser bundle to demo dir.');
  }

  await buildHTML();

  ghpages.publish(DEMO_DIR, (err) => {
    if (err) {
      logError(err);
      fail('Publish github pages failed.');
    } else {
      logSuccess('Published demo and docs to gh-pages branch');
    }
  });
}

async function buildHTML() {
  try {
    const outFile = pug.renderFile('./index.pug');
    const outFileName = path.resolve(DEMO_DIR, 'index.html');
    writeFileSync(outFileName, outFile);
    logSuccess('Rebuilt demo HTML with new wanakana version');
  } catch(err) {
    console.error(err)   ;
    logError('Failed to rebuild demo HTML.');
  }
}
