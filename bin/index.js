#!/usr/bin/env node
const emiln = require('../index.js')
//const commands = require('../spec/routes.js')
const commands = require('../../sempub/spec/main.js')

emiln([commands], process.argv).then(async res => {
    console.log(await res)
    //    process.exit(0)
})
