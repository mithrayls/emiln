const Joi = require('@hapi/joi')
const testFunction = require('../lib/testFunction.js')
const queryEncode = require('../lib/queryEncode.js')
/*
        handler: (request, h) => {
            return 'hi git'
        }
        */
const routes = [
    {
        method: 'GET',
        path: '/query',
        handler: queryEncode
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'root route!'
        }
    },
    {
        method: 'GET',
        path: '/git',
        handler: (request, h) => {
            return 'git route!'
        }
    },
    {
        method: 'GET',
        path: '/git/init',
        handler: testFunction
    },
    {
        method: 'GET',
        path: '/git/commit',
        handler: (request, h) => {
            return `git commit -m '${request.query.message}'`
        },
        options: {
            validate: {
                query: {
                    message: Joi.string()
                        .min(1)
                        .required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/npm/init',
        handler: (request, h) => {
            return 'hi npm'
        }
    },
    {
        method: 'GET',
        path: '/test',
        handler: (request, h) => {
            return 'hi test'
        }
    },
    {
        method: 'GET',
        path: '/be/ye/kind',
        handler: (request, h) => {
            return 'be ye kind'
        }
    }
]

module.exports = routes
