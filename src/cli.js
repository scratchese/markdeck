#!/usr/bin/env node
`use strict`
import meow from 'meow'
// import init from './init'
import exportFnc from './export'
import devFunc from './dev'
/**
 * This is just a main function
 */
const cli = meow(`
  Usage
  $ deck <action>
        export
  
  Examples
  $ deck
  $ deck export
`, {})

switch (cli.input[0]) {
  // case 'init':
  //   init()
  //   break
  case 'export':
    exportFnc({init: true, ...flags})
    break
  default:
    devFunc()
    break
}
