import fs from 'fs';
import exportFnc from './export';
// import devServer from './dev-server';
import staticServer from 'node-static';
import http from 'http';

const devServer = (srcFolder, port) => {
  const server = new(staticServer.Server)(srcFolder);
  const app = http.createServer((req,res) => {
    req.addListener('end', function () {
      server.serve(req, res);
    }).resume()
  }).listen(port, () => {
    console.log(`[server] Serving ${srcFolder}/ on http://localhost:${port}`)
  });
}

const callback = () => {
  console.log('[deck] files are up to date')
};

const devFnc = (flags) => {
  exportFnc({init: true, callback, ...flags})
  devServer(flags.output, flags.port);
  fs.watch(flags.src, (event, filename)=>{
    exportFnc({init: false, callback, ...flags});
  })
}

export default devFnc;
