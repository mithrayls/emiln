#!/usr/bin/env node
/*
 console.time('start')
console.timeEnd('start')
*/
const emiln = require('../index.js')
const main = require('../../sempub/spec/main.js')
const git = require('../../sempub/spec/git.js')
//console.log(JSON.stringify(commands))

emiln([main, git], process.argv).then(async res => {
    console.log('Result:')
    console.log(await res)
})
