const exec = require('child_process').exec
import path from 'path';
import fs from 'fs';
import showdown from 'showdown';
import { readFile } from 'fs';
import {Printer, execute, rmrf} from './util';

const DEFAULT_SRC_FOLDER = 'decks';
const DEFAULT_OUTPUT_FOLDER = 'docs';
const DEFAULT_THEME = 'basic';

const exportFnc = (flags) => {
  execute(`ls -1 ${DEFAULT_SRC_FOLDER}`, psnttns=>{
    const srcMarkdown = psnttns.split('\n').map((psnttn=>psnttn.substring(psnttn.lastIndexOf('/')+1)))
    srcMarkdown.pop()
    exportPresentations({flags, srcMarkdown});
  })
}

const exportPresentations = ({flags, srcMarkdown}) => {
  for(let markdown of srcMarkdown) {
    const transformedMarkdownName = markdown.replace('.md', '').replace(/ /g,"_").toLowerCase();
    const outputDeckPath = path.join(DEFAULT_OUTPUT_FOLDER, 'deck');
    const outputPath = path.join(outputDeckPath, transformedMarkdownName);
    const templtPath = path.join(__dirname, 'templates')
    rmrf(outputDeckPath, () => {
      execute(`mkdir -p ${outputPath}/nextdeck`, ()=>{
        console.log(`created ${outputPath}`)
        execute(`cp -f ${templtPath}/themes/${DEFAULT_THEME}.css ${outputPath}/nextdeck/`, ()=>{
          console.log(`created ${outputPath}/nextdeck/${DEFAULT_THEME}.css`)
          execute(`cp -f ${templtPath}/nextdeck.js ${outputPath}/nextdeck/`, ()=>{
            console.log(`created ${outputPath}/nextdeck/nextdeck.js`)
            exportHTML({transformedMarkdownName, outputPath, DEFAULT_THEME, templtPath, markdown})
          })
        })
      })
    })
  }
}

const exportHTML = ({transformedMarkdownName, outputPath, DEFAULT_THEME, markdown}) => {
  const converter = new showdown.Converter()
  markdown = path.join(DEFAULT_SRC_FOLDER, markdown)
  fs.readFile(markdown, 'utf8', (err, data) => {
    const html = converter.makeHtml(data);
    const pages = html.split('<hr />')
    const pageMax = pages.length;
    pages.forEach((content, i)=>{
      const fileName = (i==0)?'index.html':`${i}.html`;
      const outputHTMLPath = path.join(outputPath, `${fileName}`)
      console.log(`created ${outputHTMLPath}`)
      const file = new Printer(outputHTMLPath)
      file.print(`<html>
        <head>
          <meta charset="utf-8">
          <meta property="og:type" content="website">
          <meta property="og:image" content="">
          <meta property="og:site_name" content="">
          <title>Presentation | ${i}</title>
          <link rel='stylesheet' type='text/css' href='nextdeck/${DEFAULT_THEME}.css'>
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
            
            const getCurrentPath = () => {
              if(window.location){
                const currentPath = window.location.href.split('/')
                currentPath.pop()
                const currentSrcPath = currentPath.join('/');
                return currentSrcPath;
              }
            }
            
            function goBack(loc) {
              console.log(loc);
              const url = getCurrentPath()+"/"+loc;
              window.location.href = url;
            }
            function goForward(loc) {
              console.log(loc);
              const url = getCurrentPath()+"/"+loc;
              window.location.href = url;
            }
          </script>        
        </head>
        <body>
          <div id='displayer'>
            <div>${content}</div>
          </div>
          <div id='btn-container'>
            <a class='btn' onclick='goBack("${(i-1<=0)?'index.html':(i-1).toString()+'.html'}")'><<</a>
            <a class='btn' onclick='goForward("${((i+1)%pageMax==0)?'index.html':(i+1)%pageMax+'.html'}")'>>></a>
            <a class='btn' onclick='toggleFullScreen()'>full screen</a>
          </div>
        </body>
        </html>`)
      file.end()
    })
  });
}

// const _src = '/Users/andy.chen/projects/nextdeck/demo/wafflejs_speech_0904.md';
// const _output = DEFAULT_OUTPUT_FOLDER
// exportFnc({src: _src, output: _output})

export default exportFnc;
