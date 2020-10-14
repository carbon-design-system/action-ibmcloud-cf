/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');
const { downloadTool } = require('@actions/tool-cache');
const execOptions = require('./exec-options');
const run = require('./run');

/**
 * Installs IBM Cloud CLI.
 */
async function install() {
  try {
    const cliPath = await downloadTool('https://clis.cloud.ibm.com/install/linux');
    await exec('bash', [cliPath], execOptions);
    await run('ibmcloud cf install -v 7.1.0 --force', execOptions);
  } catch (error) {
    setFailed(`Error installing IBM Cloud CLI: ${error.stack}`);
    throw error;
  }
}

module.exports = install;
