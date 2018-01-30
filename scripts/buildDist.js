const path = require('path');
const glob = require('glob');
const { exec, exit } = require('shelljs');
const buildSite = require('./buildSite');
const {
  BIN, SOURCE_DIR, OUT_DIR, log, logSuccess, logError, execSuccess,
} = require('./util');

function buildFlatModules() {
  log('Compiling direct import es modules...');

  const sourceFiles = glob
    .sync(`${SOURCE_DIR}/**/*.js`, {
      ignore: [`${SOURCE_DIR}/node_modules/**/*.js`, `${SOURCE_DIR}/__tests__/**/*.js`],
    })
    .map((to) => path.relative(SOURCE_DIR, to));

  return exec(
    `cd ${SOURCE_DIR} && ` +
      'cross-env BABEL_ENV=cjs ' +
      `${BIN}/babel ${sourceFiles.join(' ')} ` +
      `--out-dir ${OUT_DIR}`
  );
}

function buildBundles() {
  log('Compiling bundles...');
  return exec('npm run build:bundles');
}

if (execSuccess(buildFlatModules()) && execSuccess(buildBundles()) && buildSite()) {
  logSuccess('Successfully built dist & demo site files');
} else {
  logError('Building files failed.');
  exit(1);
}
