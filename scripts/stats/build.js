import 'colors';
import { exec, setExecOptions } from '../exec';
import fsp from 'fs-promise';
import { statsRoot, distRoot, sigmaDistRoot, libRoot, esRoot, scriptsRoot, repoRoot } from '../../config/paths';
import buildBabel from '../buildBabel';

export default function BuildES() {
  console.log('Calculating: '.cyan + 'stats'.green);

  const statsDir = `${statsRoot}/${(new Date()).toISOString()}`

  let cmds = [`ls -l ${esRoot} | awk '{print $5, $9}' > ${statsDir}/es.txt`,
          `ls -l ${distRoot} | awk '{print $5, $9}' > ${statsDir}/dist.txt`,
          `ls -l ${sigmaDistRoot} | awk '{print $5, $9}' > ${statsDir}/sigma.txt`,
          `ls -l ${libRoot} | awk '{print $5, $9}' > ${statsDir}/lib.txt`,
          `cp ${repoRoot}/.babelrc ${statsDir}`,
          `cp -R ${scriptsRoot} ${statsDir}/scripts`]

  return fsp.mkdirs(statsDir)
    .then(() => Promise.all(cmds.map(cmd => exec(cmd))))
    .then(() => console.log('Calculated: '.cyan + 'stats'.green));
}
