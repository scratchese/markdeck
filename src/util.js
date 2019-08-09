const fs = require('fs')
const exec = require('child_process').exec

class Printer {
  constructor(_target){
    this.logger = fs.createWriteStream(_target, {
      flags: 'a' // 'a' means appending
    })
  }
  print(line){
    this.logger.write(line)
  }
  end(){
    this.logger.end()
  }
}


const execute = (command, callback) => {
  exec(command, function(error, stdout, stderr){ callback(stdout); });
};

const rmrf = (file, callback) => {
  execute(`rm -rf ${file}`, callback)
}

export {Printer, execute, rmrf}