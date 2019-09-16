const c = require('ansi-colors')
function createHelpTable(routes, url) {
    /*
    let route = Object.keys(routes)[key]
    let options = { ...routes[route].options, ...routes[route] }
    let handler = options.handler
*/
    let ep = url

    const helpTableHeading = ` 
# Git
| Description    |    Command | Web API | 
| :------------- | :----------- | :------ | `

    let helpTableBody = ''
    for (let route of Object.values(routes)) {
        let options = { ...route.options, ...route }
        delete options['handler']
        delete options['options']
        let query = c.underline(ep + options.path)
        let command = options.path.replace(/\//g, ' ')
        let description = ''
        try {
            description = options.description
        } catch {}
        let row = ''
        row += '\n'
        row += '| '
        row += description
        row += ' | '
        row += command
        row += ' | '
        row += query
        row += ' |'
        helpTableBody += row
    }

    const helpTable = helpTableHeading + helpTableBody

    return helpTable
}

module.exports = createHelpTable
