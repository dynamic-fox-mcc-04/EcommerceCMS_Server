const { Product } = require("../models/index")

module.exports = (req, res, next) => {
    if (req.currentUserId) { //untuk authentikasi admin
        Product.findOne({
            where: {
                'id': req.params.id
            }
        }).then(result => {
            if (result) {
                // console.log('AUTH OK')
                return next()
            } else {
                return next({
                    name: 'NotFound'
                })
            }

        }).catch(err => {
            console.log('ERROR DARI FILE AUTHORIZATION', err)
        })
    }
}