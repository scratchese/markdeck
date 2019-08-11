import path from 'path';
import {exec} from 'child_process';

const init = (flags) => {
  const DEFAULT_MD = `./${flags.src}/presentation.md`;
  exec(`mkdir -p ${flags.src}`)
  exec(`cp -rf ${path.resolve(__dirname, 'markdeck', 'template', 'init.md')} ${DEFAULT_MD}`)
  console.log(`created ${DEFAULT_MD}`)
  console.log(`try \`deck\` to start`)
}

export default init
