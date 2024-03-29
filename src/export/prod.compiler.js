import path from 'path';
import fs from 'fs';
import showdown from 'showdown';
import { readFile } from 'fs';
import { fork, exec } from 'child_process';
import {Printer, execute} from '../util';
import {CUSTOMIZE_CSS} from '../default';
import {screenshotUrlToImage} from '../seo';
const minify = require('html-minifier').minify;

export const generateScreenShotCallBack = ({flags, outputPath, filename}) => {
  const backgroundServerPath = path.join(__dirname, 'background.server.js')
  const forked_background_server = fork(backgroundServerPath);
  forked_background_server.send(flags)
  forked_background_server.on('message', (flags)=>{
    execute(`ls ${outputPath}/*.html`, (files)=>{
      files = files.split('\n');
      files.pop();
      const path = outputPath.replace(`${flags.out}/`, '');
      execute(`mkdir -p ${outputPath}/meta`, async ()=>{
        const screenshots = files.map(async (file)=>{
          const file_name = `${file.split('.html')[0].split('/').pop()}`
          const url = `http://localhost:${flags.port}/${path}/${file_name}.html`;
          const outputFullPath = `${outputPath}/meta/${file_name}.jpeg`;
          console.log(`created ${outputFullPath}`);
          return await screenshotUrlToImage(url, outputFullPath)
        })
        Promise.all(screenshots).then(()=>{
          console.log(`finished search engine optimization!`);
          forked_background_server.kill()
        }).catch(err=>{
          console.log('Error', err);
        })
      });
    })
  })
}

const compiler = ({flags, outputPath, filename, markdown, callback}) => {
  const converter = new showdown.Converter()
  markdown = path.join(flags.src, markdown)
  fs.readFile(markdown, 'utf8', (err, data) => {
    const html = converter.makeHtml(data);
    const pages = html.split('<hr />')
    const pageMax = pages.length;
    pages.forEach((content, i)=>{
      const fileNamePure = (i==0)?'index':`${i}`;
      const htmlFileName = `${fileNamePure}.html`;
      const outputHTMLPath = path.join(outputPath, `${htmlFileName}`)
      flags.init && console.log(`created ${outputHTMLPath}`)
      const file = new Printer(outputHTMLPath)
      const productionRootURL = flags.url || require(path.resolve(process.cwd(), 'package.json')).markdeck.url;
      const productionImageURLPending = path.join(productionRootURL.replace('https://github.com/', 'raw.githubusercontent.com/').replace('/tree', ''), outputPath ,'meta', `${fileNamePure}.jpeg?${Date.now()}`);
      const productionImageURL = 'https://' + productionImageURLPending.replace('/docs/docs/', '/docs/')
      const title = `${filename.charAt(0).toUpperCase() + filename.slice(1)} | ${(fileNamePure=='index')?'Welcome':fileNamePure}`;
      const htmlString = `<html lang="en">
        <head>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <meta name="referrer" content="no-referrer-when-downgrade"></meta>
          <title>${title}</title>
          <meta property="og:type" content="article"></meta>
          <meta property="og:title" content="${title}"></meta>
          <meta property="og:image" content="${productionImageURL}"></meta>
          <meta property="og:image:type" content="image/jpeg" /></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:image" content="${productionImageURL}"></meta>
          <meta name="twitter:title" content="${title}"></meta>
          <meta property="article:modified_time" content="${Date().toLocaleString()}"></meta>
          <meta property="article:publisher" content="https://amazingandyyy.com/markdeck"></meta>
          <meta name="twitter:site" content="@markdeck"></meta>
          <meta name="twitter:creator" content="@markdeck"></meta>
          <meta property="og:image:width" content="640"></meta>
          <meta property="og:image:height" content="320"></meta>
          <meta property="og:description" content="${data}"></meta>
          <meta name="twitter:description"></meta>
          <link rel='stylesheet' type='text/css' href='markdeck/${flags.theme}.css'>
          <link rel='stylesheet' type='text/css' href='markdeck/${CUSTOMIZE_CSS}'>

          <script type="application/javascript">
            function toggleFullScreen() {
              if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
              } else {
                if (document.exitFullscreen) {
                  document.exitFullscreen(); 
                }
              }
            }
            function getCurrentPath() {
              if(window.location){
                const currentPath = window.location.href.split('/')
                currentPath.pop()
                const currentSrcPath = currentPath.join('/');
                return currentSrcPath;
              }
            }
            function goBack(loc) {
              const url = getCurrentPath()+"/"+loc;
              window.location.href = url;
            }
            function goForward(loc) {
              const url = getCurrentPath()+"/"+loc;
              window.location.href = url;
            }
          </script>        
        </head>
        <body id='page-${i}'>
          <div id='displayer'>
            <div>${content}</div>
          </div>
          <div id='btn-container'>
            <a class='btn' onclick='goBack("${(i-1<=0)?'index.html':(i-1).toString()+'.html'}")'>back</a>
            <a class='btn' onclick='goForward("${((i+1)%pageMax==0)?'index.html':(i+1)%pageMax+'.html'}")'>next</a>
            <!--<a class='btn' onclick='toggleFullScreen()'>full screen</a>-->
          </div>
        </body>
        </html>`
      const optString = minify(htmlString, {
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true
      });
      file.print(optString)
      file.end()
    })
    if((typeof callback)=='function'){
      callback({flags, outputPath, filename})
    }
  });
}

export default compiler;
