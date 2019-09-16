#!/usr/bin/env node
'use strict'

const fs = require('fs')
const yargs = require('yargs-parser')
const fetch = require('node-fetch')
const queryEncode = require('./lib/queryEncode.js')
const puppi = require('./lib/puppi.js')
const interactive = require('./lib/interactive.js')
const startServer = require('./lib/startServer.js')
const _ = require('lodash')
//const packageJson = JSON.parse(fs.readFileSync('./package.json'))

let domain = 'localhost'
let protocol = 'http'
let delimiter = '://'
let port = '19271'

async function emiln(routes) {
    //    console.log(routes)
    const args = yargs(process.argv.slice(2))
    const queryString = queryEncode(args)
    const endpoint = protocol + delimiter + domain + ':' + port
    const uri = endpoint + queryString
    //    const routes_data = JSON.parse(JSON.stringify(routes))
    const routes_data = _.cloneDeep(routes)
    //   console.log(routes_data)
    let server = await startServer({ routes, domain, port })
    if (args.daemon) {
        console.log('Server listening on ' + endpoint)
    }

    //console.log('Calling API: ' + uri)
    let res = await puppi(uri)
    //    console.log(res)

    if (args.interactive) {
        args.daemon = true
        interactive({ routes_data, endpoint })
    }

    if (!args.daemon) {
        server.stop({ timeout: 60 * 1000 })
    }
    return res
}

module.exports = emiln

/*
 *

module.exports = { registerStorage }

*/
let routes = require('../sempub/spec/git.js')

emiln([routes]).then(res => {
    console.log(res)
})
