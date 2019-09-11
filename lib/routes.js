const routes = [
    {
        method: 'GET',
        path: '/lib',
        handler: (request, h) => {
            //            console.log('fucking libs')
            return 'Hello World!'
        },
        otherprop: 'eue'
    },
    {
        method: 'GET',
        path: '/lib/git',
        handler: (request, h) => {
            console.log(request)
            return ''
        }
    },
    {
        method: 'GET',
        path: '/lib/npm',
        handler: (request, h) => {
            console.log(h)
            return ''
        }
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!3'
        }
    },
    {
        method: 'GET',
        path: '/be/ye/kind',
        handler: (request, h) => {
            return 'Hello World!43'
        }
    }
]

module.exports = routes
