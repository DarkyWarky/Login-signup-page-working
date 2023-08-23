require('dotenv').config()

const config = {
    secret_jwt: process.env.SECRET_KEY_JWT,
    UserEmail:process.env.USER_EMAIL,
    UserPassword:process.env.USER_PASSWORD
}


module.exports = config