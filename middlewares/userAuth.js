const { User } = require('../models')
const { Op } = require('sequelize')

function userAuth(req, res, next) {
    let { email } = req.body
    let payload = { email }
    User.findOne({
        where: {
            [Op.and]: [
                {email: payload.email},
                {role: 'user'}
            ]
        }
    })
        .then( result => {
            if (result) {
                req.currentUserId = result.id
                return next()
            } else {
                return next({
                    name: 'Unauthorized',
                    errors: [{ message: 'Please login using user account' }]
                })
            }
        })
        .catch( err => {
            return next(err)
        })
}

module.exports = userAuth