import staticServer from 'node-static';
import http from 'http';
import { exec } from 'child_process';

const devServer = (targetDir) => {
  const server = new(staticServer.Server)(targetDir);
  return {
    start: (port) => {
      const app = http.createServer((req,res) => {
        req.addListener('end', function () {
          server.serve(req, res);
        }).resume()
      }).listen(port, () => {
        console.log(`[server] Serving ${targetDir}/ on http://localhost:${port}`)
      });
      process.on('SIGINT', () => {
        exec(`rm -rf ${targetDir}`);
        console.log(`\n[server] Stop serving ${targetDir}/`)
        process.exit();
      })
    },
  }
}

export default devServer;