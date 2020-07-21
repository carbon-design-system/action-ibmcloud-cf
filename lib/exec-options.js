/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { debug, info } = require('@actions/core');

module.exports = {
  listeners: {
    stdout(data) {
      debug(data.toString().trim());
    },
    stderr(data) {
      info(data.toString().trim());
    },
  },
};
