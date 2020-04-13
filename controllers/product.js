const { Product } = require('../models')

class Controller {

    static create(req, res, next){

        const { name, image_url, price, stock} = req.body

        Product.create({
            name,
            image_url,
            price,
            stock
        })
        .then( result =>{

            return res.status(201).json({
                message : 'Success create product'
            })
        })
        .catch(err => {
            return next(err)
        })


    }
}

module.exports = Controller