import path from 'path'
const exec = require('child_process').exec
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER} from './default';

const init = () => {
  const DEFAULT_MD = `./${DEFAULT_SRC_FOLDER}/presentation.md`;
  exec(`mkdir -p ${DEFAULT_SRC_FOLDER}`)
  exec(`cp -rf ${path.join(__dirname, 'markdeck', init.md)} ${DEFAULT_MD}`)
  console.log(`created ${DEFAULT_MD}`)
  console.log(`try \`deck\` to start`)
}

export default init
