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
function renderHelpTable(helpTable) {
    helpTable = marked(helpTable)
    return helpTable
}

module.exports = renderHelpTable
