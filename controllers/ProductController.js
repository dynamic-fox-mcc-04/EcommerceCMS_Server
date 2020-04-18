const { Product } = require('../models')

class ProductController {
    static findAll(req, res, next) {
        Product.findAll()
            .then((data) => {
                return res.status(200).json({ data })
            })
            .catch((err) => {
                return next({
                    name: 'NotFound',
                    errors: [{ msg: 'Data Not Found' }]
                })
            })
    }

    static findOne(req, res, next) {
        const id = req.params.id
        Product.findOne({
                where: {
                    id: id
                }
            })
            .then((data) => {
                return res.status(200).json({ data })
            })
            .catch((err) => {
                return next({
                    name: 'NotFound',
                    errors: [{ msg: 'Data Not Found' }]
                })
            })
    }

    static addProduct(req, res, next) {
        const payload = {
            name: req.body.name,
            image: req.body.image,
            videourl: req.body.videourl,
            description: req.body.description,
            price: +req.body.price,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(payload)
        Product.create(payload)
            .then((data) => {
                return res.status(201).json({ data })
            })
            .catch((err) => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ msg: 'Failed to Create.' }]
                })
            })
    }

    static editProduct(req, res, next) {
        const id = req.params.id
        const payload = {
            name: req.body.name,
            image: req.body.image,
            videourl: req.body.videourl,
            description: req.body.description,
            price: +req.body.price
        }
        Product.update(payload, {
                where: {
                    id: id
                }
            })
            .then((data) => {
                return res.status(201).json({ data })
            })
            .catch((err) => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ msg: 'Failed to Update.' }]
                })
            })
    }

    static deleteProduct(req, res, next) {
        const id = req.params.id
        Product.delete({
                where: {
                    id: id
                }
            })
            .then((result) => {
                return res.status(201).json({ result })
            })
            .catch((err) => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ msg: 'Failed to Delete.' }]
                })
            })
    }
}

module.exports = ProductController