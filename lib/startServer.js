const Joi = require('@hapi/joi')
const Hapi = require('@hapi/hapi')
const HapiSwagger = require('hapi-swagger')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const renderHelpTable = require('./renderHelpTable.js')
const createHelpTable = require('./createHelpTable.js')
const log = require('../../logger')

async function evalValidation(route) {
    let validation = route.options.validate
    for (let key in validation) {
        for (let key2 in route.options.validate[key]) {
            route.options.validate[key][key2] = eval(
                route.options.validate[key][key2]
            )
        }
    }
    return route
}

async function startServer(options) {
    log.verbose('Starting server(inside)')
    let port = options.port
    let domain = options.domain
    let endpoint = domain + ':' + port
    let routeFamilies = options.routes
    const server = Hapi.server({
        port: port,
        host: domain
    })
    log.verbose('Setting routes')
    for (let routeFamily of routeFamilies) {
        routes = Object.values(routeFamily)
        for (let route of routes) {
            log.info(`Setting route with path: **${route.path}**`)
            if (route.options && route.options.validate) {
                route = await evalValidation(route)
            }
            server.route(route)
        }
    }
    log.info(`Setting route with path: **/help**`)
    server.route({
        method: 'GET',
        path: '/help',
        handler: async (request, h) => {
            let res = await createHelpTable(routes, endpoint)
            res = renderHelpTable(res)
            return res
        },
        options: {
            description: 'Returns help',
            notes: 'Returns help',
            tags: ['api'] // ADD THIS TAG
        }
    })
    log.info(`Setting route with path: **/{any*}**`)
    server.route({
        method: '*',
        path: '/{any*}',
        handler: function(request, h) {
            let res = ''
            return res
        },
        options: {
            description: 'Returns help',
            notes: 'Returns help',
            tags: ['api'] // ADD THIS TAG
        }
    })
    log.verbose('Routes set')
    /*
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
    return server
}

module.exports = startServer
