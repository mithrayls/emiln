#!/usr/bin/env node
'use strict'

const fs = require('fs')
const yargs = require('yargs-parser')
const fetch = require('node-fetch')
const queryEncode = require('./lib/queryEncode.js')
const puppi = require('./lib/puppi.js')
const startServer = require('./lib/startServer.js')
const _ = require('lodash')

let domain = 'localhost'
let protocol = 'http'
let delimiter = '://'
let port = '19271'

async function emiln(routes) {
    const args = yargs(process.argv.slice(2))
    const path = '/' + args._.join('/')
    console.log(path)
    const queryString = queryEncode(args)
    const endpoint = protocol + delimiter + domain + ':' + port
    const uri = endpoint + queryString
    const routes_data = _.cloneDeep(routes)
    const route = _.find(routes_data[0], function(o) {
        return o.path === path
    })
    let res
    let server = await startServer({ routes, domain, port })
    if (args.daemon) {
        console.log('Server listening on ' + endpoint)
    }

    res = await puppi(uri, route)

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
