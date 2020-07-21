/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getInput, setFailed, setSecret } = require('@actions/core');
const { exec } = require('@actions/exec');
const execOptions = require('./exec-options');

async function login() {
  try {
    const cloudAPIKey = getInput('cloud-api-key');
    const org = getInput('cf-org');
    const space = getInput('cf-space');
    const region = getInput('cf-region');
    setSecret(cloudAPIKey);
    await exec(
      'ibmcloud',
      [
        'login',
        '-a',
        'https://cloud.ibm.com',
        '-u',
        'apikey',
        '-p',
        cloudAPIKey,
        '-o',
        org,
        '-s',
        space,
        ...(!region ? [] : ['-r', region]),
      ],
      execOptions
    );
  } catch (error) {
    setFailed(`Logging into IBM Cloud failed: ${error.stack}`);
    throw error;
  }
}

module.exports = login;
