const { decode } = require('../helpers/jwt')
const { Customer } = require('../models')

function authCustomer(req, res, next){
    try {
        let decoded = decode(req.headers.customer_token)

        Customer.findOne({
            where : { id : decoded.id }
        })
        .then( result => {

            if ( result ){

                req.customerId = result.id
                return next()

            } else {

                return next({
                    name : 'Unauthorized',
                    errors : [ { message : 'user not authenticated '}]
                })
                
            }

        })
        .catch(err => {
            return next({
                name : 'Unauthorized',
                errors : [ { message : 'user not authenticated '}]
            })
        })

    } catch(err){

        return next(err)
    }


}

module.exports = authCustomer