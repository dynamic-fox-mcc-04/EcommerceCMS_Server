const { Product } = require('../models')

class ProductController {
    static addProduct (req, res, next) {
        const product = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            userId: req.currentuserId
        }
        Product.create(product)
        .then((result) => {
            return res.status(201).json({
                id: result.id,
                name: result.name,
                image_url: result.image_url,
                price: result.price,
                userId: result.userId
            })
        }).catch((err) => {
            return next(err)
        });
    }

    static deleteProduct (req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            return res.status(200).json({
                message: 'Data successfully deleted'
            })
        }).catch((err) => {
            return next(err)
        });
    }

    static updateProduct (req, res, next) {
        Product.update({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price
        },{
            where: {
                id: req.params.id
            }
        })
        .then((result) => {
            return res.status(200).json({
                message: 'Data successfully updated'
            })
        }).catch((err) => {
            return next(err)
        });
    }
    static readProduct (req, res, next) {
        Product.findAll()
        .then((result) => {
            const products = result.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    image_url: el.image_url,
                    price: el.price,
                    userId: el.userId
                }
            })
            return res.status(200).json({
                products
            })
        }).catch((err) => {
            return next(err)
        });
    }
}

module.exports = ProductController