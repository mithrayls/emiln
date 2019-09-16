const fetch = require('node-fetch')
const cliSpinners = require('cli-spinners')
const logUpdate = require('log-update')
const log = logUpdate.create(process.stdout, {
    showCursor: true
})
const c = require('ansi-colors')
const Inflectors = require('en-inflectors').Inflectors
const changeCase = require('change-case')
const frames = cliSpinners.dots.frames

function inflect(sentence) {
    //const routes = Object.values(require('../sempub/spec/git.js'))
    let sentence_arr = sentence.split(' ')
    let firstWord = sentence_arr[0]
    let instance = new Inflectors(firstWord).toGerund()
    sentence_arr[0] = instance
    sentence = sentence_arr.join(' ')
    return changeCase.sentenceCase(sentence)
}
async function puppi(uri, route) {
    /*
    let i = 0
    let interval = setInterval(() => {
        const frame = c.green(frames[(i = ++i % frames.length)])
        log(`
    ${frame} ${inflect(route.options.description)} ${frame}
        `)
    }, 40)
    */
    let res = await fetch(uri).then(async res => {
        let response = await res.text()
        //    console.log(response)
        return response
    })
    // clearInterval(interval)
    return res
}

module.exports = puppi
