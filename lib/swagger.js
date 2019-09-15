async function swagger() {
    console.log('Fetching swagger.json: ' + endpoint + '/swagger.json')

    let swagger = await fetch(endpoint + '/swagger.json').then(async res => {
        let swagger_json = await res.text()
        fs.writeFileSync('./swagger.json', swagger_json)
        return swagger_json
    })
    const swaggerOptions = {
        info: {
            title: packageJson.name,
            version: packageJson.version
        }
    }
}
