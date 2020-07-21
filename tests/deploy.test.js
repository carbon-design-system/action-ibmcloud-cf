/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getInput, setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');
const execOptions = require('../lib/exec-options');
const deploy = require('../lib/deploy');

jest.mock('@actions/core');
jest.mock('@actions/exec');
jest.mock('@actions/tool-cache');

describe('Deploying a CF app to IBM Cloud', () => {
  it('runs the right set of commands', async () => {
    getInput.mockImplementation((name) => ({ 'cf-app': 'cf-app-foo' }[name]));
    await deploy();
    expect(exec).toHaveBeenNthCalledWith(
      1,
      'ibmcloud',
      ['cf', 'add-plugin-repo', 'CF-Community', 'https://plugins.cloudfoundry.org'],
      execOptions
    );
    expect(exec).toHaveBeenNthCalledWith(
      2,
      'ibmcloud',
      ['cf', 'install-plugin', 'blue-green-deploy', '-f', '-r', 'CF-Community'],
      execOptions
    );
    expect(exec).toHaveBeenNthCalledWith(
      3,
      'ibmcloud',
      ['cf', 'blue-green-deploy', 'cf-app-foo', '--delete-old-apps'],
      execOptions
    );
  });

  it('runs the right set of commands with CF manifest specified', async () => {
    getInput.mockImplementation((name) => ({ 'cf-app': 'cf-app-foo', 'cf-manifest': 'cf-manifest-foo' }[name]));
    await deploy();
    expect(exec).toHaveBeenNthCalledWith(
      1,
      'ibmcloud',
      ['cf', 'add-plugin-repo', 'CF-Community', 'https://plugins.cloudfoundry.org'],
      execOptions
    );
    expect(exec).toHaveBeenNthCalledWith(
      2,
      'ibmcloud',
      ['cf', 'install-plugin', 'blue-green-deploy', '-f', '-r', 'CF-Community'],
      execOptions
    );
    expect(exec).toHaveBeenNthCalledWith(
      3,
      'ibmcloud',
      ['cf', 'blue-green-deploy', 'cf-app-foo', '-f', 'cf-manifest-foo', '--delete-old-apps'],
      execOptions
    );
  });

  it('handles error executing command', async () => {
    exec.mockReturnValue(Promise.reject(new Error('exec-command-error')));
    let caught;
    try {
      await deploy();
    } catch (error) {
      caught = error;
    }
    expect(caught && caught.message).toBe('exec-command-error');
    expect(setFailed).toHaveBeenCalled();
  });

  afterEach(() => {
    setFailed.mockReset();
    exec.mockReset();
  });
});
