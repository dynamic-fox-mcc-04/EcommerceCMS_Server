const jwt = require('jsonwebtoken')

const generateToken = payload => {
    return jwt.sign(payload, process.env.SECRET)
}

const decodeToken = payload => {
    return jwt.verify(payload, process.env.SECRET)
}

module.exports = {
    generateToken,
    decodeToken
}