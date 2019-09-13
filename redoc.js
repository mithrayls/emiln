const Redoc = require('redoc').Redoc
const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

let html = fs.readFileSync('../sempub/index.html')
const dom = new JSDOM(html)
window = dom.window
document = window.document

console.log(Object.keys(Redoc.Redoc))
Redoc.init(
    'http://petstore.swagger.io/v2/swagger.json',
    {
        scrollYOffset: 50
    },
    document.getElementById('redoc-container')
)
