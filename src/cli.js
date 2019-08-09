#!/usr/bin/env node
`use strict`
import meow from 'meow'
import init from './init'
import exportFnc from './export'
/**
 * This is just a main function
 */
const cli = meow(`
  Usage
  $ deck <action>
            init
            start
            export
  
  Examples
  $ deck init
  $ deck start
  $ deck export
`, {})

switch (cli.input[0]) {
  case 'init':
    init()
    break
  case 'export':
    exportFnc()
    break
  default:
    // run()
    console.log('cooooolllllll')
    break
}
