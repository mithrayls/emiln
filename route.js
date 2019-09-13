const Joi = require('@hapi/joi')

let route = {
    method: 'GET',
    path: '/git/push/{name?}',
    options: {
        handler: async (request, h) => {
            let remote_name = request.params.name
            console.log('hi')
            return remote_name
        },
        validate: {
            params: Joi.object({ name: Joi.string().min(2) })
        },
        description: 'Pushes to repository'
    }
}

module.exports = route
