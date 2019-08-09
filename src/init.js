import path from 'path'
const exec = require('child_process').exec

const init = (flags) => {
  const {src} = flags
  const srcFolder = src?src:'decks'
  const templateFoler = path.resolve(__dirname, 'templates')
  exec(`cp -rf ${templateFoler}/ ./${srcFolder}`)
}

export default init
