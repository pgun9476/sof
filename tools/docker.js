/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import cp from 'child_process';
import run from './run';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';
import render from './render';
import pkg from '../package.json';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function docker() {
  const dComm = ['-f', './docker/docker-compose.local.yml'];

  if (process.argv.includes('--build')) {
    await run(clean);
    await run(copy);
    await run(bundle);
    dComm.push('build');
  }

  if (process.argv.includes('--up')) {
    dComm.push('up');
  }

  cp.spawnSync('docker-compose', dComm, { stdio: 'inherit' });
}

export default docker;
