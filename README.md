# <a name="emiln"></a>Emiln 🦋

![emiln](https://raw.githubusercontent.com/mithrayls/emiln/master/emiln.svg?sanitize=true)

## Introduction

`emiln` aims to unite the development of CLI applications and REST APIs into a single interface which is clear to understand for both users and developers. This is achieved by abstracting the symmetries in these interfaces with the understanding that with every symmetry, there is also a law of conservation. Simply, `emiln` aims to help you focus your time on parsing arguments and checking types, and more on the things that make your application different.

## Contents

-   [Introduction](#introduction)
-   [Contents](#contents)
-   [Installation](#installation)
-   [Usage](#usage)

---

![emiln](https://raw.githubusercontent.com/mithrayls/emiln/master/reflection.jpeg)

---

-   [hapi][]
-   [joi][]
-   [node-fetch][fetch]
-   [mocha][]
-   [should][]

Bottom text :)

[hapi]: https://hapi.dev/ 'hapi: Web and services application framework'
[joi]: https://github.com/hapijs/joi 'joi: Schema description language and data validator for JavaScript'
[fetch]: https://npmjs.com/package/node-fetch
[mocha]: https://www.npmjs.com/package/mocha
[should]: https://www.npmjs.com/package/should

<!--
## Installation

```shell
yarn add emiln

# or

npm i emiln
```
## Usage

There are two steps to using this tool.

1. Using the `cligen` module
2. Writing a json or yaml file that defines your own API

### Using the bdd-cligen module

This is the main executable and should be placed in the `./bin` directory of your node project. The variable `program` is a [commander](https://www.npmjs.com/package/commander) object. It will make all functions in the `exec_path` callable with `your_app_name subcommand function_name --option_with_no_param --option_with_param icecream`

```javascript
#!/usr/bin/env node

const cligen = require('cligen')

const api = [
    {
        spec_path: './spec/api.yml',
        exec_path: './lib',
        subcommand: ''
    },
    {
        spec_path: './spec/sub1.yml',
        exec_path: './lib/subpath1',
        subcommand: 'subcommand1'
    },
    {
        spec_path: './spec/subcommand2.yml',
        exec_path: './lib/another_subpath2',
        subcommand: 'subcommand2'
    }
]

cligen(api).then(program => {
    program.parse(process.argv)
})
```



### Writing a yaml file

```yaml
testFunc:
    name: 'testFunc'
    description: 'Should load spec from file'
    func_name: 'testFunc'
    params_user:
        - name: message
          type: string
          default: 'Hello :)'
    params_internal:
        - name:
          type:
          default:
```
-->
