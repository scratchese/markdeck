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

export default devServer;