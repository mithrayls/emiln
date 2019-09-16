const inquirer = require('inquirer')
const Joi = require('@hapi/joi')

var questions = [
    {
        type: 'input',
        name: 'first_name',
        message: "What's your first name",
        validate: function(value) {
            const schema = Joi.string().min(1)
            const { error, val } = schema.validate(value)
            if (!error) {
                return true
            }
            return error.details[0].message
        }
    }
]

inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, '  '))
})
