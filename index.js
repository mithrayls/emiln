#!/usr/bin/env node
'use strict'

const fs = require('fs')
const yargs = require('yargs-parser')
const fetch = require('node-fetch')
const queryEncode = require('./lib/queryEncode.js')
const puppi = require('./lib/puppi.js')
const interactive = require('./lib/interactive.js')
const startServer = require('./lib/startServer.js')
//const packageJson = JSON.parse(fs.readFileSync('./package.json'))

let domain = 'localhost'
let protocol = 'http'
let delimiter = '://'
let port = '19271'

async function emiln(routes, argv) {
    //console.log(routes)
    const args = yargs(process.argv.slice(2))
    const queryString = queryEncode(args)
    const endpoint = protocol + delimiter + domain + ':' + port
    const uri = endpoint + queryString
    let server = await startServer({ routes, domain, port })
    if (args.daemon) {
        console.log('Server listening on ' + endpoint)
    }

    console.log('Calling API: ' + uri)
    console.log(routes[0].commit)
    let res = await puppi(uri)
    console.log(res)

    if (args.interactive) {
        args.daemon = true
        interactive({ routes, endpoint })
    }

    if (!args.daemon) {
        server.stop({ timeout: 60 * 1000 })
    }
}

module.exports = emiln

/*
 *

module.exports = { registerStorage }

*/
let routes = require('../sempub/spec/git.js')

emiln([routes])
