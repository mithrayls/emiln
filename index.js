'use strict'
const testFunction = require('./lib/testFunction.js')
const fetch = require('node-fetch')
const Hapi = require('@hapi/hapi')
const queryEncode = require('./lib/queryEncode.js')
const yargs = require('yargs-parser')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')

let domain = 'localhost'
let protocol = 'http'
let delimiter = '://'
let port = '3001'

async function emiln(routes, argv) {
    //console.log(routes)
    const args = yargs(process.argv.slice(2))
    const server = Hapi.server({
        port: port,
        host: domain
    })

    for (let route of routes) {
        server.route(route)
    }

    process.on('unhandledRejection', err => {
        console.log(err)
        process.exit(1)
    })

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: '0.0.1'
            /*
            documentationPage: false,
            swaggerUI: false
            */
        }
    }

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    await server.start()

    /*
    const queryString = queryEncode(args)
    const url = protocol + delimiter + domain + ':' + port + queryString

    console.log(url)
    server.ext('onPreResponse', function(request, h) {
        process.exit(1)
        return h.continue
    })
    let res = await fetch(url).then(async res => {
        let response = await res.text()
        return response
    })
     */
    let res = ' '

    return res
}

module.exports = emiln
