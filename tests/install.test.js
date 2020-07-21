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
const install = require('../lib/install');
const execOptions = require('../lib/exec-options');

jest.mock('@actions/core');
jest.mock('@actions/exec');
jest.mock('@actions/tool-cache');

describe('Installing IBM Cloud CLI', () => {
  it('runs the right set of commands', async () => {
    downloadTool.mockReturnValue('/path/to/ibmcloud/cli');
    await install();
    expect(downloadTool).toHaveBeenCalledWith('https://clis.cloud.ibm.com/install/linux');
    expect(exec).toHaveBeenNthCalledWith(1, 'bash', ['/path/to/ibmcloud/cli'], execOptions);
    expect(exec).toHaveBeenNthCalledWith(2, 'ibmcloud', ['cf', 'install'], execOptions);
  });

  it('handles error downloading IBM Cloud CLI', async () => {
    downloadTool.mockReturnValue(Promise.reject(new Error('ibm-cloud-cli-download-error')));
    let caught;
    try {
      await install();
    } catch (error) {
      caught = error;
    }
    expect(caught && caught.message).toBe('ibm-cloud-cli-download-error');
    expect(downloadTool).toHaveBeenCalledWith('https://clis.cloud.ibm.com/install/linux');
    expect(exec).not.toHaveBeenCalled();
    expect(setFailed).toHaveBeenCalled();
  });

  afterEach(() => {
    setFailed.mockReset();
    exec.mockReset();
    downloadTool.mockReset();
  });
});
