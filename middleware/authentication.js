const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = function(req, res, next) {
    console.log('MASUK AUTHENTICATION')
    console.log(process.env.SECRET)
    let authenticate = jwt.verify(req.headers.access_token, process.env.SECRET)
    User.findOne({
        where: {
            Email:authenticate.Email
        }
    })
        .then(function(result) {
            req.authenticated = result
            next()
        })
        .catch(function(err) {
            next(err)
        })
    
}