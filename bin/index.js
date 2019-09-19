#!/usr/bin/env node
/*
 console.time('start')
console.timeEnd('start')
*/
const emiln = require('../index.js')
const main = require('../../sempub/spec/main.js')
const git = require('../../sempub/spec/git.js')
const log = require('../../logger/index.js')
//console.log(JSON.stringify(commands))

emiln([main, git], process.argv).then(async res => {
    log.prettyObj(await res)
})
