import path from 'path';
import {execute, rmrf} from '../util';
import {CUSTOMIZE_CSS} from '../default';
import prodCompile, {generateScreenShotCallBack} from './prod.compiler';
import devCompile from './dev.compiler';

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
  const templtPath = path.join(__dirname, '..', 'markdeck');
  rmrf(outputDeckPath, () => {
    execute(`mkdir -p ${outputPath}/markdeck`, ()=>{
      flags.init && console.log(`created ${outputPath}`)
      execute(`cp -rf ${templtPath}/themes/${flags.theme}.css ${outputPath}/markdeck/`, ()=>{
        flags.init && console.log(`created ${outputPath}/markdeck/${flags.theme}.css`)
        execute(`cp -rf ${flags.src}/${filename}.css ${outputPath}/markdeck/${CUSTOMIZE_CSS}`, ()=>{
          flags.init && console.log(`created ${outputPath}/markdeck/${CUSTOMIZE_CSS}`)
          execute(`cp -rf ${templtPath}/lib.js ${outputPath}/markdeck/`, ()=>{
            flags.init && console.log(`created ${outputPath}/markdeck/lib.js`)
            if(flags.assets){
              execute(`cp -rf ${flags.src}/${flags.assets} ${outputPath}/`, ()=>{
                flags.init && console.log(`created ${outputPath}/${flags.assets}`)
                exportHTML({flags, outputPath, markdown, callback, filename})
              })
            }else{
              exportHTML({flags, outputPath, markdown, callback, filename})
            }
          })
        })
      })
    })
  })
}

const exportHTML = (args) => {
  if(args.flags.optimize) {
    prodCompile({...args, callback: generateScreenShotCallBack})
  }else{
    devCompile(args)
  }
}

export { exportPresentation };
export default exportFnc;
