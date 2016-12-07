import { exec } from '../exec';
import { sigmaSrcRoot, sigmaDistRoot } from '../../config/paths';

export default function BuildDistributable() {
  console.log('Building: '.cyan + 'sigma'.green);

  return exec(`rimraf ${sigmaDistRoot}`)
    .then(() => Promise.all([
      exec(`webpack --bail --config ${sigmaSrcRoot}/webpack.config.sigma.js`)
    ]))
    .then(() => console.log('Built: '.cyan + 'sigma'.green));
}