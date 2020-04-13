const { Product } = require('../models')

const authorization = (req, res, next) => {
    Product.findOne({
        where: {
            id: +req.params.id
        }
    })
    .then((result) => {
        if (result) {
            if (result.userId == req.currentuserId) {
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
                errors: [{ message: 'Data Product Not Found' }]
            })
        }
    }).catch((err) => {
        return next(err)
    });
} 

module.exports = authorization