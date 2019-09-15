const fetch = require('node-fetch')

async function puppi(uri) {
    let res = await fetch(uri).then(async res => {
        let response = await res.text()
        //    console.log(response)
        return response
    })

    return res
}

module.exports = puppi
