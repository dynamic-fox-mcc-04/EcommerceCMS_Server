const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authenticationSuper(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)
        User.findOne({ where: { id: decoded.id }})
            .then(result => {
                if(result.role === 'superadmin') {
                    req.user = {
                        id: result.id,
                        email: result.email
                    }
                    return next()
                }
                else {
                    throw { status: 404, type: '404 Not Found', message: 'User not found' }
                }
            })
            .catch(err => {
                return next({ status: 401, type: 'Unauthorized', message: 'User unauthenticated - not a super admin' })
            })
    } catch (err) {
        console.log('nyasar sini')
        next(err)
    }
}

function authenticationAdmin(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)
        User.findOne({ where: { id: decoded.id }})
            .then(result => {
                if(result.role === 'superadmin' || result.role === 'admin') {
                    req.user = {
                        id: result.id,
                        email: result.email
                    }
                    return next()
                }
                else {
                    throw { status: 404, type: '404 Not Found', message: 'User not found' }
                }
            })
            .catch(err => {
                return next({ status: 401, type: 'Unauthorized', message: 'User unauthenticated - not an admin' })
            })
    } catch (err) {
        console.log('nyasar sini')
        next(err)
    }
}

module.exports = { authenticationSuper, authenticationAdmin }