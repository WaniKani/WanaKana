const fs = require('fs');
const path = require('path');
const { exec, exit, cp, test } = require('shelljs');
const semver = require('semver');
const readline = require('readline-sync');
const pick = require('lodash/pick');
const packageLoc = require('../package.json');
const util = require('./util');

const {
  PACKAGE_NAME,
  OUT_DIR,
  log,
  logSuccess,
  logError,
  execFail,
} = util;

const PACKAGE_JSON = {
  loc: packageLoc,
  keepFields: [
    'name',
    'version',
    'license',
    'homepage',
    'repository',
    'bugs',
  ],
  extraFields: {
    main: 'lib/wanakana.js',
    browser: 'lib/wanakana.min.js',
    module: 'lib/wanakana.esm.js',
    keywords: [
      'english',
      'japanese',
      'hiragana',
      'katakana',
      'kana',
      'romaji',
      'conversion',
      'transliteration',
      'input',
      'wanikani',
    ],
  },
};

const writePackage = (outDir, filename) =>
  fs.writeFileSync(
    path.resolve(outDir, 'package.json'),
    JSON.stringify(filename, null, 2),
    'utf8'
  );

try {
  log('Preparing release...');
  if (execFail(exec('git diff-files --quiet'))) {
    logError(
      'You have unsaved changes in the working tree. ' +
      'Commit or stash changes before releasing.'
    );
    exit(1);
  }

  log('Running tests...');
  if (execFail(exec('npm run lint && npm test'))) {
    logError(
      'The test command did not exit cleanly. Aborting release.'
    );
    exit(1);
  }
  logSuccess('Tests were successful.');

  log('Building dist files...');
  if (execFail(exec('npm run build:all'))) {
    logError(
      'The build command did not exit cleanly. Aborting release.'
    );
    exit(1);
  }
  log('Compilation was successful.');

  log('Copying additional project files...');
  const additionalProjectFiles = [
    'README.md',
    'CHANGELOG.md',
    'package.json',
    'LICENSE',
  ];

  additionalProjectFiles.forEach((filename) => {
    const src = path.resolve(process.cwd(), filename);
    if (!test('-e', src)) {
      logError(`Unable to resolve ${src}`);
      exit(1);
    }
    cp('-Rf', src, path.resolve(OUT_DIR));
  });

  const versionLoc = path.resolve('VERSION');
  const version = fs.readFileSync(versionLoc, 'utf8').trim();
  let nextVersion = readline.question(
    `Next version of ${PACKAGE_NAME} (current version is ${version}): `
  );

  while (!(
    !nextVersion ||
    (semver.valid(nextVersion) && semver.gt(nextVersion, version))
  )) {
    nextVersion = readline.question(
      `Must provide a valid version that is greater than ${version}, ` +
      'or leave blank to skip: '
    );
  }

  log('Updating package.json...');
  const updatedPackage = Object.assign({},
    PACKAGE_JSON.loc,
    { version: nextVersion }
  );
  const releasePackage = Object.assign({},
    pick(updatedPackage, PACKAGE_JSON.keepFields),
    PACKAGE_JSON.extraFields
  );

  log(updatedPackage);
  log(releasePackage);

  writePackage(OUT_DIR, releasePackage);

  log(`About to publish ${PACKAGE_NAME}@${nextVersion} to npm.`);
  if (!readline.keyInYN('Sound good? ')) {
    log('OK. Stopping release.');
    exit(0);
  }

  log('Publishing...');
  if (execFail(exec(`cd ${OUT_DIR} && npm publish`))) {
    logError('Publish failed. Aborting release.');
    exit(1);
  }
  logSuccess(`${PACKAGE_NAME}@${nextVersion} was successfully published.`);

  log('Updating VERSION file...');
  fs.writeFileSync(versionLoc, `${nextVersion}\n`, 'utf8');
  log('Updating repo package.json');
  writePackage(process.cwd(), updatedPackage);

  log('Committing changes...');
  const newTagName = `v${nextVersion}`;
  exec(`git add ${versionLoc} package.json`);
  exec(`git commit -m "Version ${newTagName}"`);

  log(`Tagging release... (${newTagName})`);
  exec(`git tag ${newTagName}`);

  log('Pushing to GitHub...');
  exec('git push');
  exec('git push --tags');

  log('Publishing demo and docs to github pages.');
  if (exec('git push origin `git subtree split --prefix gh-pages master`:gh-pages --force').code !== 0) {
    logError('Publish github pages failed.');
    exit(1);
  }
  logSuccess('Published github pages');

  logSuccess('Done.');
} catch (error) {
  logError('Release failed due to an error', error);
}
