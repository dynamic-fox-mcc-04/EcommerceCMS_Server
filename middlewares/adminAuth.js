const { User } = require('../models')
const { Op } = require('sequelize')

function adminAuth(req, res, next) {
    let { email } = req.body
    console.log(req.body)
    let payload = { email }
    User.findOne({
        where: {
            [Op.and]: [
                { email: payload.email },
                { role: 'admin' }
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
                    errors: [{ message: 'Only admin is authorized' }]
                })
            }
        })
        .catch( err => {
            return next(err)
        })
}

module.exports = adminAuth