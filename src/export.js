import {exec} from 'child_process';
import path from 'path';
import fs from 'fs';
import showdown from 'showdown';
import { readFile } from 'fs';
import {Printer, execute, rmrf} from './util';
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER, DEFAULT_THEME} from './default';

const exportFnc = (flags) => {
  console.log(flags);
  flags.init = (flags.init==false)?false:true;
  const srcFolder = flags.src || DEFAULT_SRC_FOLDER;
  execute(`ls -1 ${srcFolder}`, psnttns=>{
    const srcMarkdown = psnttns.split('\n').map((psnttn=>psnttn.substring(psnttn.lastIndexOf('/')+1)))
    srcMarkdown.pop()
    exportPresentations({flags, srcMarkdown, srcFolder});
  })
}

const exportPresentations = ({flags, srcMarkdown, srcFolder}) => {
  const finish = srcMarkdown.length;
  srcMarkdown.forEach((markdown, i) =>{
    const callback = (i+1==finish)?flags.callback:null;
    exportPresentation({flags, markdown, callback, srcFolder});
  });
}

const exportPresentation = ({flags, markdown, callback, srcFolder}) => {
  const outputFolder = flags.out || DEFAULT_OUTPUT_FOLDER;
  const themeName = flags.theme || DEFAULT_THEME;
  const filename = markdown.replace('.md', '').replace(/ /g,"_").toLowerCase();
  const outputDeckPath = path.join(outputFolder, 'deck');
  const outputPath = path.join(outputDeckPath, filename);
  const templtPath = path.join(__dirname, 'markdeck')
  rmrf(outputDeckPath, () => {
    execute(`mkdir -p ${outputPath}/markdeck`, ()=>{
      flags.init && console.log(`created ${outputPath}`)
      execute(`cp -rf ${templtPath}/themes/${themeName}.css ${outputPath}/markdeck/`, ()=>{
        flags.init && console.log(`created ${outputPath}/markdeck/${themeName}.css`)
        execute(`cp -rf ${templtPath}/lib.js ${outputPath}/markdeck/`, ()=>{
          flags.init && console.log(`created ${outputPath}/markdeck/lib.js`)
          exportHTML({flags, filename, outputPath, themeName, templtPath, markdown, callback, srcFolder})
        })
      })
    })
  })
}

const exportHTML = ({flags, filename, outputPath, themeName, markdown, callback, srcFolder}) => {
  const converter = new showdown.Converter()
  markdown = path.join(srcFolder, markdown)
  fs.readFile(markdown, 'utf8', (err, data) => {
    const html = converter.makeHtml(data);
    const pages = html.split('<hr />')
    const pageMax = pages.length;
    pages.forEach((content, i)=>{
      const fileName = (i==0)?'index.html':`${i}.html`;
      const outputHTMLPath = path.join(outputPath, `${fileName}`)
      flags.init && console.log(`created ${outputHTMLPath}`)
      const file = new Printer(outputHTMLPath)
      file.print(`<html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta property="og:type" content="website">
          <meta property="og:image" content="">
          <meta property="og:site_name" content="">
          <title>Presentation | ${i}</title>
          <link rel='stylesheet' type='text/css' href='markdeck/${themeName}.css'>
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
              const url = getCurrentPath()+"/"+loc;
              window.location.href = url;
            }
            function goForward(loc) {
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
    if((typeof callback)=='function'){
      callback()
    }
  });
}

export { exportPresentation };
export default exportFnc;
