const logUpdate = require('log-update')
const puppi = require('./puppi.js')
const createTable = require('./createTable.js')
const c = require('ansi-colors')

const Inflectors = require('en-inflectors').Inflectors
const changeCase = require('change-case')
const cliSpinners = require('cli-spinners')

function inflect(sentence, pos) {
    //const routes = Object.values(require('../sempub/spec/git.js'))
    let sentence_arr = sentence.split(' ')
    let firstWord = sentence_arr[0]
    let instance = new Inflectors(firstWord).toGerund()
    sentence_arr[0] = instance
    sentence = sentence_arr.join(' ')
    return changeCase.sentenceCase(sentence)
}

async function interactive(options) {
    let selected = 0
    let ep = options.endpoint
    let subtext,
        table,
        exec = ''
    let routes = options.routes_data[0]
    let routesLength = Object.values(routes).length
    let key
    let busy_message = ''
    let busy_frames = cliSpinners.dots.frames
    let busy_start = false
    let busy_end = false
    let i = 0

    table = createTable(routes, 0, ep)
    logUpdate(table)

    let interval = setInterval(() => {
        if (busy_end) {
            frames = busy_frames[0]
        } else {
            frames = busy_frames
        }
        const frame = c.green(frames[(i = ++i % frames.length)])
        table = createTable(routes, Number(selected), ep)
        description = routes[Object.keys(routes)[selected]].options.description //.options.description
        let busy_message_block = ''
        if (busy_message) {
            busy_message_block = frame + ' ' + busy_message + ' ' + frame
        }
        logUpdate(
            `${table}
            ${busy_message_block}
            `.trim()
        )
    }, 40)

    var stdin = process.stdin
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')
    stdin.on('data', async function(keypress) {
        key = keypress
        if (key === '\u0003') {
            process.exit()
        }
        if (key === '\u000D') {
            let path = Object.values(routes)[selected].path
            //    logUpdate.clear()
            busy_start = true
            busy_end = false
            busy_message = inflect(description, 'gerund')

            exec = await puppi(ep + path)
            busy_start = false
            busy_end = true
            //console.log(exec)
        } else if (key === 'j' || key === '\u001b[B') {
            selected = (selected + 1 + routesLength) % routesLength
        } else if (key === 'k' || key === '\u001b[A') {
            selected = (selected - 1 + routesLength) % routesLength
        } else if (!isNaN(key)) {
            selected = key
        }
    })
}

module.exports = interactive
