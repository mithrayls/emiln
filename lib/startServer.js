const Joi = require('@hapi/joi')
const Hapi = require('@hapi/hapi')
const HapiSwagger = require('hapi-swagger')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')

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
    let port = options.port
    let domain = options.domain
    let routeFamilies = options.routes
    const server = Hapi.server({
        port: port,
        host: domain
    })
    for (let routeFamily of routeFamilies) {
        routes = Object.values(routeFamily)
        for (let route of routes) {
            if (route.options && route.options.validate) {
                route = await evalValidation(route)
            }
            //console.log('adding route:' + route.path)
            //console.log(route)
            server.route(route)
            try {
            } catch {}
        }
    }
    process.on('unhandledRejection', err => {
        console.log(err)
        process.exit(1)
    })
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