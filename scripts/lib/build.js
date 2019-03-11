import 'colors';
import { exec } from '../exec';
import fsp from 'fs-promise';
import { srcRoot, libRoot } from '../../config/paths';
import babelConfig from '../../config/babel.config';
import buildBabel from '../buildBabel';

export default function BuildCommonJs() {
  console.log('Building: '.cyan + 'npm module'.green);

  return exec(`rimraf ${libRoot}`)
    .then(() => fsp.mkdirs(libRoot))
    .then(() => buildBabel(srcRoot, libRoot, babelConfig("development")))
    .then(() => console.log('Built: '.cyan + 'npm module'.green))
    .catch(err => console.error(err));
}