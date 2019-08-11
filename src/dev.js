import fs from 'fs';
import exportFnc from './export';
import devServer from './dev-server';

const callback = () => {
  console.log('[deck] files are up to date')
};

const devFnc = (flags) => {
  exportFnc({init: true, callback, ...flags})
  flags.out = '.cache.deck';
  devServer(flags.out).start(flags.port);
  fs.watch(flags.src, (event, filename)=>{
    console.log(flags.out)
    console.log({init: false, callback, ...flags})
    exportFnc({init: false, callback, ...flags});
  })
}

export default devFnc;
