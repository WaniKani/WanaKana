process.env.BABEL_ENV = 'test';

module.exports = (wallaby) => {
  console.log(wallaby);
  return {
    files: ['src/**/*.js', 'test/helpers/*.js', 'package.json'],
    tests: ['test/**/performance.test.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(require('./package.json').babel), // eslint-disable-line global-require
    },

    testFramework: 'jest',

    setup() {
      const jestConfig = require('./package.json').jest; // eslint-disable-line global-require
      wallaby.testFramework.configure(jestConfig);
    },
  };
};
