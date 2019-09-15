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

//

function createTable(routes, key, url) {
    let count = 0
    let route = Object.keys(routes)[key]
    let entries = Object.entries(routes[route].options)
    let options = { ...routes[route].options, ...routes[route] }
    try {
        //        options.validate = ''
        let new_options_validate = ''
        for (let i in options.validate) {
            for (let i2 in options.validate[i]) {
                let validation_string
                validation_string = options.validate[i][i2]
                new_options_validate += i2 + ': ' + validation_string
                /*
                validation_string = validation_string.replace(/^Joi./, '')
                validation_array = validation_string.split('.')
                new_options_validate += `   • ${i2}\n`
                for (let val of validation_array) {
                    new_options_validate += `${val}\n\n
                    `
                }
                */
            }
            /*
             */
        }
        options.validate = new_options_validate
        //      console.log(new_options_validate)
        //        options.validate = new_options_validate
        /*
        options.validate = JSON.stringify(options.validate)
        options.validate = marked('\t* one\n\t* two')
        */
        //        options.validate
    } catch {}
    let handler = options.handler
    delete options['handler']
    delete options['options']
    let detail = `
    ${c.bold('Selected option:')}

    `
    //    path: ${routes[route].path}
    for (let option in options) {
        let key = option
        let val = options[option].toString()
        //        console.log(val)
        if (val.trim()) {
            detail += `
        ${c.green(key + ': ')}
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
