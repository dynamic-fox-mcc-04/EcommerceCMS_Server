const jwt = require('jsonwebtoken')

function generateToken( payload ){

    return jwt.sign( payload, process.env.KEY)
}

function decode ( token ) {
    
    return jwt.verify( token, process.env.KEY)
}

module.exports = { generateToken, decode}