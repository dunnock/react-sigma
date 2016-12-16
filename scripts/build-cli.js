/* eslint no-process-exit: 0 */

import 'colors';
import build from './build';
//import docs from '../docs/build';
import { setExecOptions } from './exec';

import yargs from 'yargs';

const argv = yargs
  .help('h')
  .option('sigma-only', {
    demand: false,
    default: false
  })
  .option('verbose', {
    demand: false,
    default: false,
    describe: 'Increased debug output'
  })
  .option('dev', {
    demand: false,
    default: false,
    describe: 'Only used when supplied with the --docs-only flag'
  })
  .argv;


setExecOptions(argv);

console.log(JSON.stringify(argv))

build(argv)
  .catch(err => {
    if (err.stack) {
      console.error(err.stack.red);
    } else {
      console.error(err.toString().red);
    }
    process.exit(1);
  });