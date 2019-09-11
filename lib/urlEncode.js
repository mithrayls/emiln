const queryString = require('query-string')

function queryEncode(argv) {
    let query = ''
    for (let arg of argv._) {
        query += '/' + arg
    }
    let options = argv
    delete options._

    if (options) {
        query += '/' + queryString.stringify(options)
    }
    /*
    if (options) {
        let first_option = true
        for (let option in options) {
            if (first_option) {
                url += '?'
            } else {
                url += '&'
            }
            url += option + '=' + options[option]
            first_option = false
        }
    }
    */
    return query
}

module.exports = queryEncode

let args = {
    _: ['hi', '', '', ''],
    hi: 'oue',
    u: true,
    t: 'e'
}

console.log(queryEncode(args))
