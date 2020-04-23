const { Order, User, Product, Order_Product_ } = require('../models')
const Order_Product_Controller = require('../controllers/order_product_Controller')

class Controller {
    static findAll(req, res, next) {
        Order.findAll({
            where: {
                UserId: req.currentUserId
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            include: [ User ]
        })
            .then( result => {
                return res.status(200).json({ result })
            })
            .catch( err => {
                return next(err)
            })
    }

    static create(req, res, next) {
        // let newCreate = { total_product: 0, total_quantity: 0, total_price: 0, checkout_status: false, UserId: req.currentUserId }
        // Order.create(newCreate)
        //     .then( result => {
        //         return res.status(201).json({
        //             result,
        //             message: 'Successfully created new order'
        //         })
        //     })
        //     .catch( err => {
        //         return next(err)
        //     })
    }

    static delete(req, res, next) {
        // Order.destroy({
        //     where: {
        //         id: req.params.id
        //     }
        // })
        //     .then( result => {
        //         if (result) {
        //             return res.status(200).json({ message: 'Successfully deleted order'})
        //         } else { 
        //             return next({
        //                 name: 'NotFound',
        //                 errors: [{ message: 'Order Not Found' }] 
        //             })
        //         }
        //     })
        //     .catch( err => {
        //         return next(err)
        //     })
    }

    static checkStock(req, res, next) {
        let { orderDetails } = req.body
        Product.findByPk(orderDetails.ProductId)
            .then(check => {
                let result = {
                    ProductId: check.id,
                    name: check.name,
                    stock: check.stock,
                    quantity: orderDetails.quantity,
                    difference: check.stock - orderDetails.quantity,
                    status: true
                }
                if (check.stock < orderDetails.quantity) {
                    result.status = false    
                }
                return res.status(200).json({ result })
            })
            .catch(err => {
                return next(err)
            })
    }

    static updateStock(req, res, next) {
        let { orderDetails } = req.body
        let newStock = 0
        for(let i = 0; i < orderDetails.length; i++) {
            Product.findByPk(orderDetails[i].ProductId)
                .then(found => {
                    if (orderDetails[i].quantity == 0) {
                        return Order_Product_.destroy({
                            where: {
                                id: orderDetails[i].id
                            }
                        })
                    } else {
                        return found
                    }
                })
                .then (updating => {    
                    newStock = updating.stock - orderDetails[i].quantity
                    return Product.update({stock: newStock}, {
                        where: {
                            id: orderDetails[i].ProductId
                        }
                    })
                })
                .then(result => {
                    return res.status(200).json({ message: `Stock Updated` })
                })
                .catch(err => {
                    return next(err)
                })
        }
    }

    static checkOut(req, res, next) {
        let { OrderId } = req.params
        Order.update({checkout_status: true}, {
            where: {
                id: OrderId
            }
        })
            .then(result => {
                return res.status(200).json ({ message: 'Successfully checked out'})
            })
            .catch(err => {
                return next(err)
            })
    }

    static findOne(req, res, next) {
        let { id } = req.params
        Order.findOne({
            where: {
                id
            }, 
            include: [ User ]
        })
            .then( result => {
                if (result) {
                    return res.status(200).json({
                        result,
                        message: 'Found'
                    })
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'Order Not Found '}]
                    })
                }
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = Controller