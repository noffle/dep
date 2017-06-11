#!/usr/bin/env node

if (Number(process.version.substr(1, 1)) < 8) {
  console.error('N-API is available in Node.js 8.0')
  process.exit(1)
}

const yargs = require('yargs')
const requireDirectory = require('require-directory')
const commands = requireDirectory(module, '../lib/', {exclude: /utils/})

yargs.usage('Usage is here')

yargs.help('help')
  .alias('help', 'h')

yargs.version(() => { return require('../package').version })
  .alias('version', 'v')
  .describe('version', 'Show version information')

Object.keys(commands).forEach((i) => {
  yargs.command(commands[i])
})

const argv = yargs.argv

if (!argv._handled) yargs.showHelp()
