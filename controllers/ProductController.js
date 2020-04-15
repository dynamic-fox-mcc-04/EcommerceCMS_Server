const { Product } = require("../models")

class ProductController {
    static create(req, res, next) {
        const { name, image_url, price, stock } = req.body
        let newProduct = {
            name,
            image_url,
            price,
            stock
        }
        Product.create(newProduct)
            .then(data => res.status(201).json(data))
            .catch(err => next(err))
    }
}

module.exports = ProductController