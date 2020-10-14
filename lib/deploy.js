/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getInput, setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');
const execOptions = require('./exec-options');

/**
 * Deploys a CF app to IBM Cloud.
 */
async function deploy() {
  const cfApp = getInput('cf-app');
  const deployDir = getInput('deploy-dir');
  try {
    const manifestFile = getInput('cf-manifest');
    await exec('ibmcloud', ['cf', 'push', cfApp, ...(!manifestFile ? [] : ['-f', manifestFile]), ['--strategy', 'rolling']], {
      ...execOptions,
      cwd: deployDir,
    });
  } catch (error) {
    setFailed(`Deploying ${cfApp} to IBM Cloud failed: ${error.stack}`);
    throw error;
  }
}

module.exports = deploy;
