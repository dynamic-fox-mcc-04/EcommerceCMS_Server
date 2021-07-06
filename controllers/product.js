const { Product } = require('../models/index')

class ProductController {
    static create(req, res, next) {
        let { name, image_url, price, category, stock } = req.body
        Product.create({
            name, image_url, price, category, stock
        }).then(response => {
            return res.status(201).json(response)
        })
        .catch(err => next(err))
    }
    static read(req, res, next) {
        Product.findAll()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(err => next(err))
    }
    static update(req, res, next) {
        let { name, image_url, price, category, stock } = req.body
        Product.update({
            name, image_url, price, category, stock
        }, { where: { id: req.params.id }, returning: true})
            .then(response => {
                return res.status(200).json(response[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }
    static destroy(req, res, next) {
        Product.destroy({ where: { id: req.params.id } })
            .then(response => {
                return res.status(200).json({ message: `Item destroyed` })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ProductController