const { UserProduct } = require('../models')

function authorization(req, res, next) {
    UserProduct.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((Product) => {
            if (Product) {
                if (Product.userId == req.currentUserId) return next()
                else return next({ name: 'Unauthorized' })
            } else {
                return next({ name: 'NotFound' })
            }
        })
        .catch(next)
}

module.exports = authorization