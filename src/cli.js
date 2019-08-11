#!/usr/bin/env node
`use strict`
import meow from 'meow'
import init from './init'
import exportFnc from './export'
import devFunc from './dev'
import { exec } from 'child_process';
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER, DEV_PORT} from './default';

const helpMsg = `
Usage
$ deck <action>
      export

Options
--src, -S  source directory, default to ./decks
--out, -O  output directory, default to ./docs
--port, -P  port for localhost, default to 1234

Examples
$ deck --port 4321
$ deck export
$ deck export --src ./my_deck --output ./ready
`

const cli = meow(helpMsg, {
  flags: {
    src: {
      type: 'string',
      alias: 'S',
      default: DEFAULT_SRC_FOLDER
    },
    output: {
      type: 'string',
      alias: 'O',
      default: DEFAULT_OUTPUT_FOLDER
    },
    port: {
      type: 'string',
      alias: 'P',
      default: DEV_PORT
    },
  }
})

const input = cli.input[0];
const flags = cli.flags;

switch (input) {
  case 'init':
    init(flags);
    break
  case 'export':
    exportFnc({init: true, ...flags})
    break
  default:
    console.log('input')
    console.log(input)
    // if(input===''){
    //   // devFunc(flags)
    // }else{
    //   console.log(`${input} is unknown action`)
    //   console.log(helpMsg)
    // }
    break
}
