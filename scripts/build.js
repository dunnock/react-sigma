// I like bootstrap build script

import 'colors';
import lib from './lib/build';
import es from './es/build';
import dist from './dist/build';
import sigma from './sigma/build';
import { copy } from './fs-utils';
import { exec } from './exec';

function forkAndBuildDocs({verbose}) {
  console.log('Building: '.cyan + 'docs'.green);

  const verboseOption = verbose ? '--verbose' : '';

  return exec(`npm run docs-build -- ${verboseOption}`)
    .then(() => console.log('Built: '.cyan + 'docs'.green));
}

export default function Build(options) {
  let proc = sigma()
  if(options.sigmaOnly)
  	return proc
  return proc.then(Promise.all([
      lib(),
      es(),
      dist(),
//    forkAndBuildDocs(options)
  ]))
}