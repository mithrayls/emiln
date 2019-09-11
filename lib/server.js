'use strict'
const argv = require('yargs-parser')(process.argv.slice(2))
const fetch = require('node-fetch')
const urlEncode = require('./urlEncode.js')

let domain = 'localhost'
let protocol = 'http'
let delimiter = '://'
let port = '3001'

/*
 */
const routes = require('./routes.js')

const Hapi = require('@hapi/hapi')

const init = async () => {
    const server = Hapi.server({
        port: port,
        host: domain
    })

    for (let route of routes) {
        server.route(route)
    }

    await server.start()
    console.log('Server running on %s', server.info.uri)

    let url = urlEncode(argv)

    //    console.log(url)
    fetch(url).then(async res => {
        console.log(await res.text())
    })
}

process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
})

init()
