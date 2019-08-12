import exportFnc from '.';
import http from 'http';
import path from 'path';

import { exec } from 'child_process';
import staticServer from 'node-static';

process.on('message', (flags) => {
  flags.init = false;
  flags.port = 1111;
  delete flags.optimize;
  devFnc(flags)
});

const devFnc = (flags) => {
  const server = new(staticServer.Server)(flags.out);
  const app = http.createServer((req,res) => {
    req.addListener('end', function () {
      server.serve(req, res);
    }).resume()
  }).listen(flags.port, () => {
    process.send(flags)
  });
  process.on('SIGINT', () => {
    process.exit();
  })
}