import staticServer from 'node-static';
import http from 'http';
import { exec } from 'child_process';

const devServer = (srcFolder) => {
  const server = new(staticServer.Server)(srcFolder);
  return {
    start: (port) => {
      const app = http.createServer((req,res) => {
        req.addListener('end', function () {
          server.serve(req, res);
        }).resume()
      }).listen(port, () => {
        console.log(`[server] Serving ${srcFolder}/ on http://localhost:${port}`)
      });
      process.on('SIGINT', () => {
        exec(`rm -rf ${srcFolder}`);
      })
    },
  }
}

export default devServer;