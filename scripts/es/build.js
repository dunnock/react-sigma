import 'colors';
import { exec } from '../exec';
import fsp from 'fs-promise';
import { srcRoot, esRoot } from '../../config/paths';
import buildBabel from '../buildBabel';

export default function BuildES() {
  console.log('Building: '.cyan + 'es module'.green);

  return exec(`rimraf ${esRoot}`)
    .then(() => fsp.mkdirs(esRoot))
    .then(() => buildBabel(srcRoot, esRoot, {
      babelrc: false,
      presets: [
        'stage-1',
        'react'
      ],
      plugins: [
        "flow-react-proptypes"
      ]
    }))
    .then(() => console.log('Built: '.cyan + 'es module'.green));
}