/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getInput, setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');
const login = require('../lib/login');
const execOptions = require('../lib/exec-options');

jest.mock('@actions/core');
jest.mock('@actions/exec');
jest.mock('@actions/tool-cache');

describe('Installing IBM Cloud CLI', () => {
  it('runs the right set of commands', async () => {
    getInput.mockImplementation(
      (name) =>
        ({
          'cloud-api-key': 'cloud-api-key-foo',
          'cf-org': 'cf-org-foo',
          'cf-space': 'cf-space-foo',
        }[name])
    );
    await login();
    expect(exec).toHaveBeenCalledWith(
      'ibmcloud',
      [
        'login',
        '-a',
        'https://cloud.ibm.com',
        '-u',
        'apikey',
        '-p',
        'cloud-api-key-foo',
        '-o',
        'cf-org-foo',
        '-s',
        'cf-space-foo',
      ],
      execOptions
    );
  });

  it('runs the right set of commands with CF region specified', async () => {
    getInput.mockImplementation(
      (name) =>
        ({
          'cloud-api-key': 'cloud-api-key-foo',
          'cf-org': 'cf-org-foo',
          'cf-space': 'cf-space-foo',
          'cf-region': 'cf-region-foo',
        }[name])
    );
    await login();
    expect(exec).toHaveBeenCalledWith(
      'ibmcloud',
      [
        'login',
        '-a',
        'https://cloud.ibm.com',
        '-u',
        'apikey',
        '-p',
        'cloud-api-key-foo',
        '-o',
        'cf-org-foo',
        '-s',
        'cf-space-foo',
        '-r',
        'cf-region-foo',
      ],
      execOptions
    );
  });

  it('handles error executing command', async () => {
    exec.mockReturnValue(Promise.reject(new Error('exec-command-error')));
    let caught;
    try {
      await login();
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
