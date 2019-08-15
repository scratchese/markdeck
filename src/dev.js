import fs from 'fs';
import exportFnc from './export';
import devServer from './dev-server';

const callback = () => {
  console.log('[deck] files updated, deck is up to date')
};

const devFnc = (flags) => {
  flags.out = '.cache.deck';
  exportFnc({init: true, callback, ...flags})
  devServer(flags.out).start(flags.port);
  fs.watch(flags.src, (event, filename)=>{
    exportFnc({init: false, callback, ...flags});
  })
}

export default devFnc;
