import path from 'path'
const exec = require('child_process').exec
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER} from './default';

const init = () => {
  const DEFAULT_MD = `./${DEFAULT_SRC_FOLDER}/presentation.md`;
  exec(`mkdir -p ${DEFAULT_SRC_FOLDER}`)
  exec(`touch ${DEFAULT_MD}`)
  exec(`echo \# You presentation > ${DEFAULT_MD}`)
  exec(`echo \\n --- \\n >> ${DEFAULT_MD}`)
  exec(`echo \# Second page >> ${DEFAULT_MD}`)
  exec(`echo \\n --- \\n >> ${DEFAULT_MD}`)
  exec(`echo \# check it out >> ${DEFAULT_MD}`)
  exec(`echo https://github.com/amazingndyyy/markdeck >> ${DEFAULT_MD}`)
  exec(`echo \\n --- \\n >> ${DEFAULT_MD}`)
  console.log(`created ${DEFAULT_MD}`)
  console.log(`try \`deck\` to start`)
}

export default init
