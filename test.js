const Inflectors = require('en-inflectors').Inflectors
const changeCase = require('change-case')
const routes = Object.values(require('../sempub/spec/git.js'))
for (let route of routes) {
    let description = route.options.description
    let description_arr = description.split(' ')
    let firstWord = description_arr[0]
    let instance = new Inflectors(firstWord).toGerund()
    description_arr[0] = instance
    description = description_arr.join(' ')
    console.log(changeCase.sentenceCase(description))
}
