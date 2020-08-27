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
const run = require('./run');

/**
 * Deploys a CF app to IBM Cloud.
 */
async function deploy() {
  const cfApp = getInput('cf-app');
  const deployDir = getInput('deploy-dir');
  const useBlueGreen = getInput('use-bluegreendeploy');
  try {
    const manifestFile = getInput('cf-manifest');
    if (useBlueGreen === 'true') {
      await run('ibmcloud cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org', execOptions);
      await run('ibmcloud cf install-plugin blue-green-deploy -f -r CF-Community', execOptions);
      await exec(
        'ibmcloud',
        ['cf', 'blue-green-deploy', cfApp, ...(!manifestFile ? [] : ['-f', manifestFile]), '--delete-old-apps'],
        {
          ...execOptions,
          cwd: deployDir,
        }
      );
    } else {
      await exec('ibmcloud', ['cf', 'push', cfApp, ...(!manifestFile ? [] : ['-f', manifestFile])], {
        ...execOptions,
        cwd: deployDir,
      });
    }
  } catch (error) {
    setFailed(`Deploying ${cfApp} to IBM Cloud failed: ${error.stack}`);
    throw error;
  }
}

module.exports = deploy;
