const { Cart, sequelize, Product } = require('../models')

class CartController {
    static add(req, res, next) {
        Cart.findOne({
            where: {
                UserId: req.currentUserId,
                ProductId: req.body.ProductId
            }
        })
            .then(Exist => {
                if (Exist) {
                    return next({
                        status: 400,
                        message: 'Product existed, try updating instead of adding a new one'
                    })
                } else {
                    return Cart.create({
                        product_qty: 1,
                        paid: false,
                        UserId: req.currentUserId,
                        ProductId: req.body.ProductId
                    })
                }
            })
            .then(cart => {
                console.log('cart is here', cart)
                res.status(201).json(cart)
            })
            .catch(err => {
                next(err)
            })
    }

    static addWithBody(req, res, next) {
        Cart.findOne({
            where: {
                UserId: req.currentUserId,
                ProductId: req.body.ProductId
            }
        })
            .then(existingCart => {
                if (existingCart) {
                    next({
                        status: 400,
                        message: 'Product existed, try updating instead of adding a new one'
                    })
                } else {
                    Cart.create({
                        product_qty: req.body.product_qty,
                        paid: false,
                        UserId: req.currentUserId,
                        ProductId: req.body.ProductId
                    })
                        .then(cart => {
                            console.log(cart)
                            res.status(201).json(cart)
                        })
                        .catch(err => {
                            next(err)
                        })
                }
            })
    }

    static findAll(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.currentUserId
            },
            order: [['createdAt', 'DESC']],
            include: [Product]
        })
            .then(carts => {
                console.log('ini masuk findAll cart')
                // console.log(carts)
                res.status(200).json(carts)
            })
            .catch(err => {
                next(err)
            })
    }

    static increase(req, res, next) {
        console.log(req.params.id)
        Cart.update({
            product_qty: sequelize.literal('product_qty + 1')
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(carts => {
                console.log(carts)
                res.status(200).json(carts[1][0])
            })
            .catch(err => {
                console.log('error kenapa ini?', err)
                next(err)
            })
    }

    static decrease(req, res, next) {
        Cart.update({
            product_qty: sequelize.literal('product_qty - 1')
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(carts => {
                // console.log(carts)
                res.status(200).json(carts[1][0])
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id;
        let deletedCart;
        Cart.findOne({
            where: { id }
        })
            .then(cart => {
                if (cart) {
                    deletedCart = cart;
                    return Cart.destroy({
                        where: { id }
                    })
                } else {
                    return next({
                        status: 404,
                        message: 'Cart not found'
                    })
                }
            })
            .then(_ => {
                res.status(200).json(deletedCart)
            })
            .catch(err => {
                return next(err)
            })
    }

    static paid (req, res, next) {
        Cart.update({
            paid: true
        }, {
            where: {
                CartId: req.params.id
            },
            returning: true
        })
            .then(data => {
                return res.status(200).json(data[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }

    static checkout (req, res, next) {
        let sold;
        Cart.findOne({
            where : {
                CartId: req.params.id,
                UserId: req.currentUserId
            }
        })
            .then(data => {
                sold = data.Product;
                if (data && data.paid) {
                    return Product.destroy({
                        where: {
                            id: data.Product.id
                        }
                    })
                } else {
                    return next({
                        status: 401,
                        message: 'User Not Found'
                    })
                }
            })
            .then(_ => {
                res.status(200).json({
                    message: 'Barang sedang dikirim',
                    sold
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = CartController;