const logUpdate = require('log-update')
const createTable = require('./createTable.js')

async function interactive(options) {
    let ep = options.endpoint
    let git = options.routes
    let table = createTable(git, 0, ep)
    logUpdate(table)

    var stdin = process.stdin
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')

    let selected = 0

    stdin.on('data', function(key) {
        let routesLength = Object.values(git).length
        let subtext,
            table,
            exec = ''
        if (key === '\u0003') {
            process.exit()
        }
        if (key === '\u000D') {
            exec = '(exec)'
        } else if (key === 'j' || key === '\u001b[B') {
            selected = (selected + 1 + routesLength) % routesLength
        } else if (key === 'k' || key === '\u001b[A') {
            selected = (selected - 1 + routesLength) % routesLength
        } else if (!isNaN(key)) {
            selected = key
        }
        let path = Object.values(git)[selected].path
        table = createTable(git, Number(selected))
        logUpdate.clear()
        logUpdate(table)
    })
}

module.exports = interactive
