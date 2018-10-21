#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const ls = require('util').promisify(fs.readdir)

process.title = 'run-ls'

async function findProjectRoot(levelsTraversed=0,currentDir=process.cwd()){
  const files = await ls(currentDir)
  for(const f of files){
    if(f === 'package.json'){
      return `${currentDir}/package.json`
    }
  }

  const parentDir = path.dirname(currentDir)

  if(parentDir === path.sep || levelsTraversed > 5){
    return null
  }

  levelsTraversed += 1
  const dir = await findProjectRoot(levelsTraversed,parentDir)
  return dir
}

async function main(){
  const root = await findProjectRoot()
  if(!root){
    console.log(`\n❗️${process.cwd()} has no package.json\n`)
    return process.exit(1)
  }

  const pkg = require(root)
  console.log(`\nCommands for ${pkg.name}:`)
  for(const name in pkg.scripts){
    const script = pkg.scripts[name]
    const shortScript = (script.length > 50) ? script.substring(0,40) + '...' : script
    const cmd = (name === 'test' || name === 'start') ? `npm ${name}` : `npm run ${name}`
    console.log(`- ${cmd} (${shortScript})`)
  }
  console.log()
  return process.exit(0)
}
main()
