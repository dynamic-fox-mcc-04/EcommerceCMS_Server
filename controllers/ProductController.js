const models = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op;

class ProductController {
    static read(req, res, next) {
        if (req.query.category) {
            return models.Product.findAll({where: { category: req.query.category}, order: [['id', 'ASC']]})
            .then(result => {
                return res.status(200).json({
                    Products: result
                })
            })
            .catch(err => {
                return next(err)
            })
        } else {
            return models.Product.findAll()
            .then(result => {
                return res.status(200).json({
                    Products: result
                })
            })
            .catch(err => {
                return next(err)
            }) 
        }
    }

    static detail(req, res, next) {
        let id = req.params.id
        return models.Product.findByPk(id) 
        .then(result => {
            return res.status(200).json({
                result
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static create(req, res, next) {
        console.log(`masuk create`)
        const { productName, imageUrl, price, stock, category } = req.body
        const newProduct = { productName, imageUrl, price, stock, category }
        return models.Product.create(newProduct)
            .then(result => {
                // console.log(`result create`,result)
                return res.status(201).json({
                    id: result.id,
                    productName: result.productName,
                    imageUrl: result.imageUrl,
                    price: result.price,
                    stock: result.stock,
                    category: result.category
                })
            })
            .catch(err => {
                // console.log(`error dari create prod cont`, err)
                return next(err)
            })
    }

    static edit(req, res, next) {
        console.log('masuk edit')
        const { id, productName, imageUrl, price, stock, category } = req.body
        const editedProduct = { productName, imageUrl, price, stock, category }
        console.log(id)
        console.log(`dari cont edit`, editedProduct)
        return models.Product.update(editedProduct, { where: { id: id } })
        .then(result => {
            // console.log(result)
            return res.status(200).json({
                message: `Successfully edited one product`
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static delete(req, res, next) {
        let param = req.params.id
        return models.Product.destroy({ where: { id: param } })
            .then(result => {
                return res.status(200).json({
                    message: `Successfully deleted one product`
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ProductController