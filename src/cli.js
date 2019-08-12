#!/usr/bin/env node
`use strict`
import meow from 'meow'
import initFnc from './init'
import exportFnc from './export'
import devFnc from './dev'
import {DEFAULT_SRC_FOLDER, DEFAULT_OUTPUT_FOLDER, DEV_PORT, DEFAULT_THEME} from './default';

const helpMsg = `
Usage
$ deck <action>
      export

Options
--src, -S  source directory, default to ./decks
--out, -O  output directory, default to ./docs
--port, -P  port for localhost, default to 1234
--assets, -A  static assets folder, default to none

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
    assets: {
      type: 'string',
      alias: 'A'
    },
  }
})

const input = cli.input[0];
const flags = cli.flags;

switch (input) {
  case 'init':
    // auto created ./decks/presentation.md for the user to start with
    // $ deck init
    initFnc(flags);
    break
  case undefined:
    // compile decks/ into .cache.deck and dev server serves it on localhost:1234
    // $ deck
    // compile my_deck_dir/ into .cache.deck and dev server serves it on localhost:1234
    // $ deck --src my_deck_dir
    // compile my_deck_dir/ into .cache.deck and dev server serves it on localhost:5000
    // $ deck --src my_deck_dir --port 5000
    devFnc(flags)
    break
  case 'export':
    // compile decks/ to docs/
    // $ deck export
    // compile my_deck_dir/ to docs/
    // $ deck export --src my_deck_dir
    // compile my_deck_dir/ to another_docs_dir/
    // $ deck export --src my_deck_dir --out another_docs_dir
    exportFnc({init: true, ...flags})
    break
  default:
    // catch unknown command and show help message
    console.log(`${input} is unknown action`)
    console.log(helpMsg)
    break
}
