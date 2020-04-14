const { Product } = require('../models')

function authorization(req, res, next){

    Product.findOne({
        where : { id : req.params.id }
    })
    .then( result => {

        if (result){
            if (result.UserId === req.userId){
                return next()
            } else {
                return next({
                    name : 'Unauthorized',
                    errors : [{ message : 'user not authorized '}]
                })
            }
        } else {
            return next({
                name : 'Unauthorized',
                errors : [{ message : 'user not authorized '}]
            })
        }
    })
    .catch(err => {
        return next(err)
    })


}

module.exports = authorization