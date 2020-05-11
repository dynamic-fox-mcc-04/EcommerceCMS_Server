const { Order } = require('../models')

function authorization(req, res, next){

    Order.findOne({
        where : { id : req.params.orderId }
    })
    .then( result => {

        if (result){
            if (result.CustomerId === req.customerId){
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