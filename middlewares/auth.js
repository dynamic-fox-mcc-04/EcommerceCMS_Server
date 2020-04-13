const models = require('../models')
const { decodeToken } = require('../helpers/jwt.js')

const authentication = (req, res, next) => {
    try {
        let decode = decodeToken(req.headers.token)
        return models.User.findOne({ where: { email: decode.email } })
            .then(result => {
                if (result) {
                    req.decoded = decode
                    return next()
                } else {
                    return next({
                        name: 'Unauthenticated',
                        errors: [{ message: `user is unauthenticated A` }]
                    })
                }
            })
            .catch(err => {
                console.log(`err dari cont`, err)
                return next({
                    name: 'Unauthenticated',
                    errors: [{ message: `user is unauthenticated B` }]
                })
            })
    } catch (err) {
        return next(err)
    }
}

const admin_authorization = (req, res, next) => {
    const role = req.decoded.role
    if (role == 'admin') {
        return next()
    } else {
        return next({
            name: 'Unauthorized',
            errors: [{ message: `you are unauthorized` }]
        })
    }
}

module.exports = {
    authentication,
    admin_authorization
}