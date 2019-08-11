import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import staticServer from 'node-static';
import exportFnc from './export';

const startDevServer = (srcFolder, port) =>{
  const devServer = new(staticServer.Server)(srcFolder);
  const app = http.createServer((req,res) => {
    req.addListener('end', function () {
      devServer.serve(req, res);
    }).resume()
  }).listen(port, () => {
    console.log(`[server] Serving! http://localhost:${port}`)
  });
}

const callback = () => {
  console.log('[deck] files up to date')
};

const devFnc = (flags) => {
  exportFnc({init: true, callback})
  startDevServer(flags.output, flags.port);
  fs.watch(flags.src, (event, filename)=>{
    exportFnc({init: false, callback});
  })
}

export default devFnc;
