'use strict'
const fs = require('fs')
const yargs = require('yargs-parser')
const Joi = require('@hapi/joi')
const Hapi = require('@hapi/hapi')
const HapiSwagger = require('hapi-swagger')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const fetch = require('node-fetch')

const testFunction = require('./lib/testFunction.js')
const queryEncode = require('./lib/queryEncode.js')
//const packageJson = JSON.parse(fs.readFileSync('./package.json'))

let domain = 'localhost'
let protocol = 'http'
let delimiter = '://'
let port = '19271'

async function emiln(routes, argv) {
    const args = yargs(process.argv.slice(2))
    const server = Hapi.server({
        port: port,
        host: domain
    })
    for (let routeFamily of routes) {
        routes = Object.values(routeFamily)
        for (let route of routes) {
            if (route.options && route.options.validate) {
                let validation = route.options.validate
                for (let key in validation) {
                    for (let key2 in route.options.validate[key]) {
                        route.options.validate[key][key2] = eval(
                            route.options.validate[key][key2]
                        )
                    }
                }
            }
            server.route(route)
        }
    }
    process.on('unhandledRejection', err => {
        console.log(err)
        process.exit(1)
    })
    /*
    const swaggerOptions = {
        info: {
            title: packageJson.name,
            version: packageJson.version
        }
    }

    await server.register([
        Inert,
        Vision,
        {
            options: swaggerOptions,
            plugin: HapiSwagger
        }
    ])
*/
    await server.start()

    const queryString = queryEncode(args)
    const endpoint = protocol + delimiter + domain + ':' + port
    const uri = endpoint + queryString

    console.log('Fetching swagger.json: ' + endpoint + '/swagger.json')
    let swagger = await fetch(endpoint + '/swagger.json').then(async res => {
        let swagger_json = await res.text()
        fs.writeFileSync('./swagger.json', swagger_json)
        return swagger_json
    })

    console.log('Calling API: ' + uri)
    let res = await fetch(uri).then(async res => {
        console.log('testing server')
        let response = await res.text()
        console.log(response)
        return response
    })

    return res
}

module.exports = emiln
