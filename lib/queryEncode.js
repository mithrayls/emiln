const queryString = require('query-string')

function queryEncode(argv) {
    let query = ''
    for (let arg of argv._) {
        query += '/' + arg
    }
    let options = argv
    delete options._

    let has_options = Object.keys(options).length > 0
    if (has_options) {
        query += '?' + queryString.stringify(options)
        query = query.replace(/\/$/, '')
    }

    //    console.log(query)
    return query
}

module.exports = queryEncode
