/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
  },
  extends: ['carbon-base'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-restricted-globals': ['error', 'isFinite'].concat(restrictedGlobals),
    strict: [2, 'safe'],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-unresolved': 2,
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      globals: {
        describe: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        afterEach: true,
        it: true,
        expect: true,
        jest: true,
      },
      rules: {
        'func-names': 0,
        'no-new': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
      },
    },
  ],
};
