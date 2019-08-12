import {exec} from 'child_process';
import path from 'path';
import fs from 'fs';
import showdown from 'showdown';
import { readFile } from 'fs';
import {Printer, execute, rmrf} from './util';
import {CUSTOMIZE_CSS} from './default';

const exportFnc = (flags) => {
  flags.init = (flags.init==false)?false:true;
  execute(`ls -1 ${flags.src}/*.md`, psnttns=>{
    const srcMarkdown = psnttns.split('\n').map((psnttn=>psnttn.substring(psnttn.lastIndexOf('/')+1)))
    srcMarkdown.pop()
    exportPresentations({flags, srcMarkdown});
  })
}

const exportPresentations = ({flags, srcMarkdown}) => {
  const finish = srcMarkdown.length;
  srcMarkdown.forEach((markdown, i) =>{
    const callback = (i+1==finish)?flags.callback:null;
    exportPresentation({flags, markdown, callback});
  });
}

const exportPresentation = ({flags, markdown, callback}) => {
  const filename = markdown.replace('.md', '').replace(/ /g,"_").toLowerCase();
  const outputDeckPath = path.join(flags.out, 'deck');
  const outputPath = path.join(flags.out, 'deck', filename);
  const templtPath = path.join(__dirname, 'markdeck');
  rmrf(outputDeckPath, () => {
    execute(`mkdir -p ${outputPath}/markdeck`, ()=>{
      flags.init && console.log(`created ${outputPath}`)
      execute(`cp -rf ${templtPath}/themes/${flags.theme}.css ${outputPath}/markdeck/`, ()=>{
        flags.init && console.log(`created ${outputPath}/markdeck/${flags.theme}.css`)
        execute(`cp -rf ${flags.src}/${filename}.css ${outputPath}/markdeck/${CUSTOMIZE_CSS}`, ()=>{
          flags.init && console.log(`created ${outputPath}/markdeck/${CUSTOMIZE_CSS}`)
          execute(`cp -rf ${templtPath}/lib.js ${outputPath}/markdeck/`, ()=>{
            flags.init && console.log(`created ${outputPath}/markdeck/lib.js`)
            exportHTML({flags, outputPath, markdown, callback})
          })
        })
      })
    })
  })
}

const exportHTML = ({flags, outputPath, markdown, callback}) => {
  const converter = new showdown.Converter()
  markdown = path.join(flags.src, markdown)
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
        <body id='page-${i}'>
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
