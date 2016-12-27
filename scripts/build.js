// I like bootstrap build script

import 'colors';
import lib from './lib/build';
import es from './es/build';
import dist from './dist/build';
import sigma from './sigma/build';
import stats from './stats/build';
import { copy } from './fs-utils';
import { exec } from './exec';

export default function Build(options) {
  let proc = sigma()

  if(!options.sigmaOnly)
    proc = proc
        .then(Promise.all([
            lib(), es()]))
        .then(()=>dist())

  if(options.stats)
    proc = proc.then(()=>stats())

  return proc
}
