const {decodeToken} = require('../helper/jwt')

function autentication(req, res, next) {
    try {
        const payload = decodeToken(req.headers.access_token)
        
    } catch (err) {
        // err\
        return next(err)
    }
}

module.exports = {
    autentication
}