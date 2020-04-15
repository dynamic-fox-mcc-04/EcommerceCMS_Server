// const { Product } = require('../models')
const { User } = require('../models')

const loginAuth = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then((result) => {
        if (result) {
            if (result.role == 'admin') {
                return next()
            } else {
                return next({
                    name: 'Unauthorized',
                    errors: [{ message: 'Unauthorized access detected' }]
                })
            }
        } else {
            return next({
                name: 'NotFound',
                errors: [{ message: 'User Not Found' }]
            })
        }
    }).catch((err) => {
        return next(err)
    });
} 

module.exports = loginAuth