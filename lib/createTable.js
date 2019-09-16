const ui = require('cliui')()
const logUpdate = require('log-update')
const c = require('ansi-colors')
const marked = require('marked')
const TerminalRenderer = require('cli-marked')

marked.setOptions({
    renderer: new TerminalRenderer({}),
    mangle: false,
    emoji: true,
    breaks: false,
    gfm: true,
    smartypants: false
})

function createTable(routes, key, url) {
    let count = 0
    let route = Object.keys(routes)[key]
    let options = { ...routes[route].options, ...routes[route] }
    let ep = url
    let new_options_validate = ''
    try {
    } catch {}
    //    console.log(options)
    for (let i in options.validate) {
        //console.log(i)
        for (let i2 in options.validate[i]) {
            //console.log(i2)
            let validation_string
            validation_string = options.validate[i][i2]
            //console.log(validation_string)
            new_options_validate += i2 + ': ' + validation_string
        }
    }
    options.validate = new_options_validate
    //console.log(options.validate)
    //console.log(routes[route])
    //process.exit(0)
    let handler = options.handler
    delete options['handler']
    delete options['options']
    //    logUpdate(JSON.stringify(options))
    let detail = `
    ${c.bold('Selected option:')}

    `
    //    path: ${routes[route].path}
    //console.log(options)
    for (let option in options) {
        //console.log(options[option])
        //        logUpdate(options[option])
        let pkey = option
        let val = ''
        try {
            val = options[option].toString()
        } catch {}
        //        console.log(val)
        if (val.trim()) {
            detail += `
        ${c.green(pkey + ': ')}
        ${c.bold.white.dim(val)}
        `
        }
    }

    let code = c.green.bold('Handler')

    code = `
## Execution Code
\`\`\`javascript

    ${handler}
    
\`\`\`
`

    var helpTable = ` 
# Git
| Description    |    Command | Web API | 
| :------------- | :----------- | :------ | `

    for (let route of Object.values(routes)) {
        let options = route.options
        let query = c.underline(ep + route.path)
        let command = route.path.replace(/\//g, ' ')
        let description = ''
        /*
         */
        try {
            description = route.options.description
        } catch {}
        if (key === count) {
            description = c.greenBright.bold(description)
            query = c.greenBright.bold(query)
            command = c.greenBright.bold(command)
        }
        /*
         */
        let row = ''
        row += '\n'
        row += '| '
        row += description
        row += ' | '
        row += command
        row += ' | '
        row += query
        row += ' |'
        helpTable += row
        count++
    }
    ui.div(
        {
            text: marked(detail)
        },
        {
            text: marked(code)
        }
    )

    helpTable = marked(helpTable) + '\n' + ui.toString()
    ui.resetOutput()
    return helpTable
}

module.exports = createTable
