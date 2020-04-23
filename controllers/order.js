const { Order, User, Product, Order_Product_ } = require('../models')

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

    static checkStock(req, res, next) {
        console.log('=====================masuk sini=====================')
        let { orderDetails } = req.body
        console.log(req.body)
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
                console.log('=====================YOKKKK=====================', err)

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
}

module.exports = Controller