import path from 'path';
import {exec} from 'child_process';
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER} from './default';

const init = () => {
  const DEFAULT_MD = `./${DEFAULT_SRC_FOLDER}/presentation.md`;
  exec(`mkdir -p ${DEFAULT_SRC_FOLDER}`)
  console.log(`cp -rf ${path.resolve(__dirname, 'markdeck', 'template', 'init.md')} ${DEFAULT_MD}`)
  exec(`cp -rf ${path.resolve(__dirname, 'markdeck', 'template', 'init.md')} ${DEFAULT_MD}`)
  console.log(`created ${DEFAULT_MD}`)
  console.log(`try \`deck\` to start`)
}

export default init
