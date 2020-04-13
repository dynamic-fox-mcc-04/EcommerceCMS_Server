const { decode } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
    try {
        const decoded = decode(req.headers.access_token)
        User.findOne({
                where: {
                    email: decoded.email
                }
            })
            .then((result) => {
                if (result) {
                    req.currentUserId = result.id
                    return next()
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'User not found' }]
                    })
                }
            }).catch((err) => {
                return res.status(401).json({
                    type: 'Unauthorized',
                    errors: 'Unauthorized'
                })
            });
    } catch (err) {
        return next(err)
    }
}

module.exports = authentication