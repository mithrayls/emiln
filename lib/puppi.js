const fetch = require('node-fetch')
const log = require('../../logger')
const queryEncode = require('./queryEncode.js')
/*
const cliSpinners = require('cli-spinners')
const logUpdate = require('log-update')
const log = logUpdate.create(process.stdout, {
    showCursor: true
})
const Inflectors = require('en-inflectors').Inflectors
const c = require('ansi-colors')
const changeCase = require('change-case')
const frames = cliSpinners.dots.frames
console.time('songshu start')
console.timeEnd('songshu start')
*/
const Songshu = require('../../songshu/index.js')
const songshu = new Songshu()

function inflect(sentence) {
    //const routes = Object.values(require('../sempub/spec/git.js'))
    let sentence_arr = sentence.split(' ')
    let firstWord = sentence_arr[0]
    let instance = new Inflectors(firstWord).toGerund()
    sentence_arr[0] = instance
    sentence = sentence_arr.join(' ')
    return changeCase.sentenceCase(sentence)
}
async function puppi(params) {
    // endpoint, path, query, route
    route = params.route
    endpoint = params.endpoint
    query = params.query
    route = params.route
    path = params.path
    try {
    } catch {}
    try {
        let validate = route.options.validate
        for (let validation of Object.values(validate)) {
            log.info(JSON.stringify(validation))
            for (let argument in validation) {
                let key = argument
                let condition = validation[key]
                log.info('key')
                log.info(key)
                log.info(condition)
                let val = await songshu.getSetDefault(key, {
                    validate: condition
                })
                query += '&' + key + '=' + val
                log.info(
                    `Route *${route.path}* set to validate with condition *${condition}*`
                )
            }
        }
    } catch (e) {}
    /*
    let i = 0
    let interval = setInterval(() => {
        const frame = c.green(frames[(i = ++i % frames.length)])
        log(`
    ${frame} ${inflect(route.options.description)} ${frame}
        `)
    }, 40)
    */
    query = query.replace(/^&/, '?')
    uri = endpoint + path + query
    log.info(`Making request to uri: **${uri}**`)
    let res = await fetch(uri).then(async res => {
        let response = await res.text()
        //    console.log(response)
        return response
    })
    // clearInterval(interval)
    return res
}

module.exports = puppi
