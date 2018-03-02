const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const util = require('./util');
const { SOURCE_DIR, OUT_DIR, PACKAGE_NAME } = util;

const cjsConfig = {
  presets: [
    [
      'env',
      {
        modules: false,
        useBuiltIns: 'entry',
        targets: {
          node: '8',
        },
      },
    ],
  ],
  plugins: ['external-helpers'],
};

const umdConfig = {
  presets: [
    [
      'env',
      {
        modules: false,
        useBuiltIns: 'entry',
        targets: {
          browsers: ['last 2 versions', '> 1%', 'not IE < 11'],
        },
      },
    ],
  ],
  plugins: ['external-helpers'],
};

export default [
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'cjs',
      file: `${OUT_DIR}/${PACKAGE_NAME}.js`,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        ...cjsConfig,
      }),
    ],
  },
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'umd',
      file: `${OUT_DIR}/umd/${PACKAGE_NAME}.js`,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        ...umdConfig,
      }),
    ],
  },
  {
    input: `${SOURCE_DIR}/index.js`,
    output: {
      name: PACKAGE_NAME,
      format: 'umd',
      file: `${OUT_DIR}/umd/${PACKAGE_NAME}.min.js`,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        ...umdConfig,
      }),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];
