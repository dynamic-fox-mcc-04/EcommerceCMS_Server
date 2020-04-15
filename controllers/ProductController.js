const models = require('../models')

class ProductController {
    static read(req, res, next) {
        return models.Product.findAll()
            .then(result => {
                // console.log(`ini result findAll`, result.dataValues)
                return res.status(200).json({
                    Products: result
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static create(req, res, next) {
        const { productName, imageUrl, price, stock, category } = req.body
        const newProduct = { productName, imageUrl, price, stock, category }
        console.log(newProduct)
        return models.Product.create(newProduct)
            .then(result => {
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
                console.log(`error dari create prod cont`, err)
                return next(err)
            })
    }

    static edit(req, res, next) {
        // let param = req.params.id
        const { id, productName, imageUrl, price, stock, category } = req.body
        console.log(id)
        const editedProduct = { productName, imageUrl, price, stock, category }
        console.log(`dari cont edit`, editedProduct)
        return models.Product.update({ editedProduct }, { where: { id: id } })
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: `Successfully edited one product`
                })
                return null
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