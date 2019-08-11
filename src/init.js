import path from 'path'
const exec = require('child_process').exec
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER} from './default';

const init = () => {
  exec(`mkdir -p ${DEFAULT_SRC_FOLDER}`)
  exec(`touch ${DEFAULT_SRC_FOLDER}/presentation.md`)
  exec(`# You presentation starts here > ${DEFAULT_SRC_FOLDER}/presentation.md`)
  console.log(`created ${DEFAULT_SRC_FOLDER}/presentation.md`)
  console.log(`try \`deck\` to start`)
}

export default init
