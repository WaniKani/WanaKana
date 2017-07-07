const fs = require('fs');
const path = require('path');
const { exec, exit, cp, test } = require('shelljs');
const semver = require('semver');
const readline = require('readline-sync');
const pick = require('lodash/pick');
const ghpages = require('gh-pages');
const buildSite = require('./buildSite');
const {
  BASE_PACKAGE,
  PACKAGE_NAME,
  LIB_DIR,
  OUT_DIR,
  SITE_DIR,
  log,
  logSuccess,
  logError,
  execFail,
} = require('./util');

const PACKAGE_JSON = {
  keepFields: [
    'name',
    'version',
    'license',
    'homepage',
    'repository',
    'description',
    'keywords',
    'bugs',
  ],
  extraFields: {
    main: `${LIB_DIR}/wanakana.js`,
    browser: `${LIB_DIR}/wanakana.min.js`,
    module: `${LIB_DIR}/wanakana.esm.js`,
  },
};

const writePackage = (outDir, packageData) =>
  fs.writeFileSync(
    path.resolve(outDir, 'package.json'),
    JSON.stringify(packageData, null, 2)
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
    logError('The test command did not exit cleanly. Aborting release.');
    exit(1);
  }
  logSuccess('Tests were successful.');

  log('Building dist files...');
  if (execFail(exec('npm run build'))) {
    logError('The build command did not exit cleanly. Aborting release.');
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
    BASE_PACKAGE,
    { version: nextVersion }
  );
  const releasePackage = Object.assign({},
    pick(updatedPackage, PACKAGE_JSON.keepFields),
    PACKAGE_JSON.extraFields
  );

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
  const newTagName = `${nextVersion}`;
  exec(`git add ${versionLoc} package.json`);
  exec(`git commit -m "Version ${newTagName}"`);

  log(`Tagging release... (${newTagName})`);
  exec(`git tag ${newTagName}`);

  log('Pushing to GitHub...');
  exec('git push');
  exec('git push --tags');

  log('Rebuilding demo site');
  buildSite(nextVersion);

  log('Rebuilding docs');
  if (execFail(exec('npm run docs'))) {
    logError('Building docs failed.');
    exit(1);
  }
  ghpages.publish(SITE_DIR, (err) => {
    if (err) {
      logError(err);
      logError('Publish github pages failed.');
      exit(1);
    } else {
      logSuccess('Published demo and docs to gh-pages branch');
    }
  });

  logSuccess('Done.');
} catch (error) {
  logError('Release failed due to an error', error);
}
