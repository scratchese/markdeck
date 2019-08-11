#!/usr/bin/env node
`use strict`
import meow from 'meow'
import init from './init'
import exportFnc from './export'
import devFunc from './dev'
/**
 * This is just a main function
 */
const cli = meow(`
  Usage
  $ deck <action>
        export
  
  Options
  --src, -S  source directory
  --out, -O  output directory
  
  Examples
  $ deck
  $ deck export
  $ export --src ./my_deck --output ./ready
`, {
  flags: {
    src: {
      type: 'string',
      alias: 'S'
    },
    output: {
      type: 'string',
      alias: 'O'
    }
  }
})

switch (cli.input[0]) {
  case 'init':
    console.log('1')
    // init();
    break
  case 'export':
      console.log('2')
    // exportFnc({init: true, ...cli.flags})
    break
  default:
      console.log('3')
    // devFunc()
    break
}
