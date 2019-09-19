'use strict'

const log = require('../logger')
const fs = require('fs')
const yargs = require('yargs-parser')
const fetch = require('node-fetch')
const queryEncode = require('./lib/queryEncode.js')
const puppi = require('./lib/puppi.js')
const startServer = require('./lib/startServer.js')
process.LOG_LEVEL = 4
/*
console.time('start puppi')
console.timeEnd('start puppi')
const _ = {
    join: require('lodash/join'),
    cloneDeep: require('lodash/cloneDeep'), //.cloneDeep,
    find: require('lodash/find') //.find
}
    */
const _ = require('lodash')

let domain = 'localhost'
let protocol = 'http'
let delimiter = '://'
let port = '19272'

async function emiln(routes) {
    log.verbose('Starting emiln')
    /*
    log.info(routes)
    log.info(JSON.stringify(routes))
    */
    const args = yargs(process.argv.slice(2))
    const path = '/' + args._.join('/')
    const query = queryEncode(args)
    const endpoint = protocol + delimiter + domain + ':' + port
    log.verbose('Finding route')
    let route_list = _.cloneDeep(routes)
    route_list = Object.values(_.merge(...route_list))
    const route = _.find(route_list, function(o) {
        return o.path === path
    })
    log.info(`Route matching path *${path}*: **${route}**`)
    /*
    console.log(route_list)
     */

    let res
    log.verbose('Starting Server')
    let server = await startServer({ routes, domain, port })
    log.verbose('Server Started')
    /*
    if (args.daemon) {
        console.log('Server listening on ' + endpoint)
    }
    */
    log.verbose('Sending request')
    res = await puppi({ endpoint, path, query, route })
    log.verbose('Received Response')

    if (!args.daemon) {
        log.verbose('Stopping Server')
        server.stop({ timeout: 60 * 1000 })
    }
    /*
     */
    return res
}

module.exports = emiln

/*
 *

module.exports = { registerStorage }

let routes = require('../sempub/spec/git.js')

emiln([routes]).then(res => {
    console.log(res)
})
*/
