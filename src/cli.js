#!/usr/bin/env node
`use strict`
import meow from 'meow'
// import init from './init'
import exportFnc from './export'
/**
 * This is just a main function
 */
const cli = meow(`
  Usage
  $ deck <action>
            export
  
  Examples
  $ deck export
`, {})

switch (cli.input[0]) {
  // case 'init':
  //   init()
  //   break
  case 'export':
    exportFnc()
    break
  default:
    console.log('https://www.npmjs.com/package/@amazingandyyy/next-deck')
    break
}
