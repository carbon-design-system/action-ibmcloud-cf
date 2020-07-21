/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { debug, info, setFailed } = require('@actions/core');
const run = require('./run');

async function logout() {
  try {
    const execOptions = {
      listeners: {
        stdout(data) {
          debug(data.toString().trim());
        },
        stderr(data) {
          info(data.toString().trim());
        },
      },
    };
    await run('ibmcloud logout', execOptions);
  } catch (error) {
    setFailed(`Logging out of IBM Cloud failed: ${error.stack}`);
    throw error;
  }
}

logout().catch(() => {});
