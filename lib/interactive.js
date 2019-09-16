const logUpdate = require('log-update')
const puppi = require('./puppi.js')
const createTable = require('./createTable.js')

async function interactive(options) {
    //console.log(options)
    let ep = options.endpoint
    let routes = options.routes_data[0]
    let table = createTable(routes, 0, ep)
    logUpdate(table)

    var stdin = process.stdin
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')

    let selected = 0

    stdin.on('data', async function(key) {
        let routesLength = Object.values(routes).length
        let subtext,
            table,
            exec = ''
        if (key === '\u0003') {
            process.exit()
        }
        if (key === '\u000D') {
            let path = Object.values(routes)[selected].path
            logUpdate.clear()
            exec = await puppi(ep + path)
            console.log(exec)
        } else if (key === 'j' || key === '\u001b[B') {
            selected = (selected + 1 + routesLength) % routesLength
        } else if (key === 'k' || key === '\u001b[A') {
            selected = (selected - 1 + routesLength) % routesLength
        } else if (!isNaN(key)) {
            selected = key
        }
        let path = Object.values(routes)[selected].path
        table = createTable(routes, Number(selected), ep)
        logUpdate.clear()
        logUpdate(table + exec)
        /*
         */
    })
}

module.exports = interactive
