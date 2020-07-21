/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const install = require('./install');
const login = require('./login');
const deploy = require('./deploy');

(async () => {
  await install();
  await login();
  await deploy();
})().catch(() => {});
