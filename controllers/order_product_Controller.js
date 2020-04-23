const { Order_Product_, Order, Product, User } = require('../models')
const { Op } = require('sequelize')

class Order_Product_Controller {
    static findAll(req, res, next) {
        Order_Product_.findAll({
            order: [
                ['OrderId', 'ASC'],
                ['id','ASC']
            ],
            include: [ 
                {
                    model: Product
                },
                {
                    model: Order,
                    include: [
                        {
                            model: User,
                            where: {
                                id: req.currentUserId
                            }
                        }
                    ]
                }
            ]
        })
            .then( found => {
                let result = []
                for(let i = 0; i < found.length; i++) {
                    if (found[i].Order !== null) {
                        result.push(found[i])
                    }
                }
                return res.status(200).json({ result })
            })
            .catch( err => {
                console.log(err)
                return next(err)
            })
    }

    static findAllOrderId(req, res, next) {
        Order_Product_.findAll({
            where: {
                OrderId: req.params.OrderId
            },
            order: [
                ['OrderId', 'ASC']
            ],
            include: [ 
                {
                    model: Product
                },
                {
                    model: Order,
                    include: [
                        {
                            model: User,
                            where: {
                                id: req.currentUserId
                            }
                        }
                    ]
                }
            ]
        })
            .then( found => {
                let result = []
                for(let i = 0; i < found.length; i++) {
                    if (found[i].Order !== null) {
                        result.push(found[i])
                    }
                }
                return res.status(200).json({ result })
            })
            .catch( err => {
                console.log(err)
                return next(err)
            })
    }

    static create(req, res, next) {
        let { id } = req.params
        let { quantity } = req.body
        let newCreate = {quantity: quantity, ProductId: id, OrderId: 0}
        let stock = 0

        Product.findByPk(id)
            .then ( productCheck => {
                stock = productCheck.stock
                return Order.findOne({
                    where: {
                        [Op.and]: [
                            { UserId: req.currentUserId },
                            { checkout_status: false}
                        ]
                    }
                })        
            })
            .then(found => {
                if (found === null) {
                    let newOrder = { total_product: 0, total_quantity: 0, total_price: 0, checkout_status: false, UserId: req.currentUserId }
                    //  console.log('xxxxxxxxxxxxxxxxxxx Ini NULL xxxxxxxxxxxxxxxxxxx')
                    return Order.create(newOrder)
                } else {
                    // console.log('xxxxxxxxxxxxxxxxxxx Ini ELSE xxxxxxxxxxxxxxxxxxx')
                    return found
                }
            })
            .then( created => {
                newCreate.OrderId = created.id
                return Order_Product_.findOne({
                    where: {
                        [Op.and]: [
                            {OrderId: newCreate.OrderId},
                            {ProductId: newCreate.ProductId}
                        ]
                    },
                    include: [Product]
                })
            })
            .then( foundProduct => {
                if (foundProduct === null) {
                    let checkStock = +quantity
                    if (checkStock <= stock) {    
                        return Order_Product_.create(newCreate)
                    } else {
                        throw {
                            name: 'BadRequest',
                            errors: [{ message: 'Sorry, stock is not enough! Please decrease your quantity!' }]
                        }
                    }
                } else {
                    let newQuantity = foundProduct.quantity + +quantity
                    let checkStock = newQuantity
                    if (checkStock <= stock) {
                        let newUpdate = {quantity: newQuantity}
                        return Order_Product_.update(newUpdate, {
                            where: {
                                [Op.and]: [
                                    {OrderId: foundProduct.OrderId},
                                    {ProductId: foundProduct.ProductId}
                                ]
                            },
                            returning: true
                        })
                    } else {
                        throw {
                            name: 'BadRequest',
                            errors: [{ message: 'Sorry, stock is not enough! Please decrease your quantity!' }]
                        }
                    }
                }
            })
            .then( result => {
                return res.status(201).json({
                    result,
                    message: 'Successfully created / updated product in order_product_ table'
                })
            })
            .catch( err => {
                return next(err)
            })
    }
    static put(req, res, next) {
        let { id } = req.params
        let { quantity, OrderId } = req.body
        let newCreate = {quantity: quantity, ProductId: id, OrderId}
        let stock = 0
        console.log(req.body)
        Product.findByPk(id)
            .then ( productCheck => {
                stock = productCheck.stock
                return Order_Product_.findOne({
                    where: {
                        [Op.and]: [
                            {OrderId: newCreate.OrderId},
                            {ProductId: newCreate.ProductId}
                        ]
                    },
                    include: [Product]
                })      
            })
            .then( foundProduct => {
                    let newQuantity = +quantity
                    let checkStock = newQuantity
                    if (checkStock <= stock) {
                        let newUpdate = {quantity: newQuantity}
                        return Order_Product_.update(newUpdate, {
                            where: {
                                [Op.and]: [
                                    {OrderId: foundProduct.OrderId},
                                    {ProductId: foundProduct.ProductId}
                                ]
                            },
                            returning: true
                        })
                    } else {
                        throw {
                            name: 'BadRequest',
                            errors: [{ message: 'Sorry, stock is not enough! Please decrease your quantity!' }]
                        }
                    }
                
            })
            .then( result => {
                return res.status(201).json({
                    result,
                    message: 'Successfully updated product in order_product_ table'
                })
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = Order_Product_Controller