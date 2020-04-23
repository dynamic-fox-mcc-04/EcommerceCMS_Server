const {Product} = require('../models')

function authorization(req, res, next) {
    // console.log(req.params.id)
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(result => {
            if(result) {
                // console.log(result.AdminId)
                if(result.AdminId == req.currentAdminId){
                    return next()
                } else {
                    return res.status(401).json({
                        name:'Unauthorized',
                        errors:'Unauthorized'
                    })
                }
            } else {
                return res.status(404).json({
                    name:'NotFound',
                    errors:'Product Not Found'
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                name: 'InternalServerError',
                errors: err
            })
        })
}

module.exports= authorization