#!/usr/bin/env node
`use strict`
import meow from 'meow'
import initFnc from './init'
import exportFnc from './export'
import devFunc from './dev'
import { exec } from 'child_process';
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER, DEV_PORT, DEFAULT_THEME} from './default';

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
$ deck export --src ./my_deck --out ./ready
`

const cli = meow(helpMsg, {
  flags: {
    src: {
      type: 'string',
      alias: 'S',
      default: DEFAULT_SRC_FOLDER
    },
    out: {
      type: 'string',
      alias: 'O',
      default: DEFAULT_OUTPUT_FOLDER
    },
    port: {
      type: 'string',
      alias: 'P',
      default: DEV_PORT
    },
    theme: {
      type: 'string',
      alias: 'T',
      default: DEFAULT_THEME
    },
  }
})

const input = cli.input[0];
const flags = cli.flags;

switch (input) {
  case 'init':
    // start init presentation
    initFnc(flags);
    break
  case undefined:
      // start dev server
      devFunc(flags)
      break
  case 'export':
    // start export assets
    exportFnc({init: true, ...flags})
    break
  default:
    console.log(`${input} is unknown action`)
    console.log(helpMsg)
    break
}
