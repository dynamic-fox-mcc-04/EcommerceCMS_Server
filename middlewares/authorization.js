const { Product } = require('../models')

function authorization(req, res, next) {
    Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if (result) {
                if (result.userId == req.currentUserId) {
                    return next()
                }
            } else {
                return res.status(404).json({
                    name: "NotFound",
                    errors: "Data Not Found"
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                name: "InternalServerError",
                errors: [{ message: "Error" }]
            })
        })
}

module.exports = authorization