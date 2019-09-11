#!/usr/bin/env node

const emiln = require('../index.js')

const commands = [
    {
        spec_path: './api.yml',
        exec_path: './lib',
        subcommand: ''
    }
]

emiln(commands).then(program => {
    program.parse(process.argv)
})
