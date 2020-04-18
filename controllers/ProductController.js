const { Product } = require('../models')
const rupiahMaker = require('../helpers/rupiahMaker');

class ProductController {
    static add(req, res, next) {
        Product.create({
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        })
            .then(newProduct => {
                return res.status(201).json(newProduct)
            })
            .catch(err => {
                return next(err)
            })
    }

    static findAll(req, res, next) {
        Product.findAll({
            order: [['updatedAt', 'DESC']]
        })
            .then(products => {
                let nominal = '';
                products.map(el => {
                    nominal = el.price;
                    el.price = rupiahMaker(nominal)
                })
                return res.status(200).json(products)
            })
            .catch(err => {
                return next(err)
            })
    }

    static findOne(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                if (product) {
                    return res.status(200).json(product)
                } else {
                    return next({
                        status: 404,
                        message: 'Product not found'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        // console.log(req.body)
        // console.log(req.params.id)
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(data) {
                    return Product.update({
                        name: req.body.name,
                        image_url: req.body.image_url,
                        price: req.body.price,
                        stock: req.body.stock,
                        category: req.body.category
                    }, {
                        where: {
                            id: req.params.id
                        },
                        returning: true
                    })
                } else {
                    return next({
                        status: 404,
                        message: 'User not Found'
                    })
                }
            })
            .then(updatedProduct => {
                console.log('--- Updated Successfully ---', updatedProduct[1][0]);
                return res.status(200).json(updatedProduct[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id;
        let deletedProduct;
        Product.findByPk(id)
            .then(product => {
                if (product) {
                    deletedProduct = product
                    Product.destroy({
                        where: {
                            id
                        }
                    })
                        .then(() => {
                            return res.status(200).json(deletedProduct)
                        })
                        .catch(err => {
                            return next(err)
                        })
                } else {
                    return next({
                        status: 404,
                        message: 'Product not found'
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ProductController;