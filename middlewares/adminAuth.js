const { User } = require('../models')

function adminAuth(req, res, next) {
    User.findOne({
        where: {
            role: 'admin'
        }
    })
        .then( result => {
            if (result) {
                return next()
            } else {
                return next({
                    name: 'Unauthorized',
                    errors: [{ message: 'Only admin can login' }]
                })
            }
        })
        .catch( err => {
            return next(err)
        })
}

module.exports = adminAuth