const models = require('../models')

class CartController {
    static read(req, res, next) {
        return models.Cart.findAll({where: {UserId: req.decoded.id}, include: {model: models.Product}, order: [['id', 'ASC']]})
        .then(result => {
            return res.status(200).json({
                Carts: result
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static addCart(req, res, next) {
        console.log('in create cart controller')
        let ProductId = req.body.ProductId
        let UserId = req.decoded.id
        let quantity = 1
        console.log('==>', {ProductId, UserId, quantity})
        return models.Product.findOne({where: {id: ProductId}})
        .then(result => {
            console.log('=====', result)
            console.log('===price', result.price)
            return models.Cart.create({
                ProductId, 
                UserId, 
                quantity,
                totalPrice: result.price})
        })
        .then(result => {
            console.log('successfully created a cart', result)
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log('err from addCart', err)
            return next(err)
        })
    }

    static editQuantity(req, res, next) {
        console.log('in patch cart controller')
        let id = req.params.id
        return models.Cart.findOne({where: {id}, include: {model: models.Product}})
        .then(result => {
            if (req.body.action == 'plus') {
                let newQuantity = result.quantity + 1
                let newTotalPrice = result.totalPrice + result.Product.price
                return models.Cart.update({
                    quantity: newQuantity,
                    totalPrice: newTotalPrice
                }, {where: {id}})  
            } else {
                let newQuantity = result.quantity - 1
                let newTotalPrice = result.totalPrice - result.Product.price
                return models.Cart.update({
                    quantity: newQuantity,
                    totalPrice: newTotalPrice
                }, {where: {id}})  
            }
        })
        .then(response => {
            console.log('successfully patch a cart', response)
            return res.status(200).json({
                response
            })
        })
        .catch(err => {
            console.log('err patch cart', err)
            return next(err)
        })

    }

    static deleteCart(req, res, next) {
        console.log('masuk contoller delete cart')
        return models.Cart.destroy({where: {id: req.params.id}})
        .then(result => {
            return res.status(200).json({
                message: `Successfully deleted one cart`
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static checkoutCart(req, res, next) {
        // console.log('masuk controller checkout')
        // let data;
        // return models.Cart.findAll({where: {UserId: req.decoded.id, isPaid: false}, include: [models.Product]})
        // .then(result => {
        //     data = result
        //     let promises = []
        //     result.forEach(el => {
        //         if (el.Product.stock >= el.quantity) {
        //             promises.push(
        //                 models.Cart.update({isPaid: true}, {where: {id: el.id}}
        //                 )
        //             )
        //         } else {
        //             return next({
        //                 name: 'SequelizeValidationError',
        //                 errors: [{message: `${el.Product.productName} stock is not enough`}]
        //             })
        //         }
        //     })
        //     return Promise.all(promises)
        // })
        // .then(result => {
        //     let newPromises = []
        //     data.forEach(el => {
        //         newPromises.push(models.Product.decrement('stock', {
        //             by: el.quantity,
        //             where: {
        //                 id: el.ProductId
        //             }
        //         }))
        //     })
        //     return Promise.all(newPromises)
        // })
        // .then(result => {
        //     console.log('successfully checkout cart')
        //     return res.status(200).json({
        //         message: 'successfully checkout cart'
        //     })
        // })
        // .catch(err => {
        //     return next(err)
        // })
        console.log('masuk controller checkout')
        const promises = []
        return models.Cart.findAll({where: {UserId: req.decoded.id, isPaid: false}, include: [models.Product]})
        .then(result => {
            return models.sequelize.transaction(t => {
                result.forEach(el => {
                    if (el.Product.stock >= el.quantity) {
                        promises.push(
                            models.Cart.update({isPaid: true}, {where: {id: el.id}}, {transaction: t}
                            ),
                            models.Product.update({stock: el.Product.stock - el.quantity}, {where: {id: el.ProductId}}, {transaction: t}
                            )
                        )
                    } else {
                        return next({
                            name: 'SequelizeValidationError',
                            errors: [{message: `${el.Product.productName} stock is not enough`}]
                        })
                    }
                })
                return Promise.all([promises])
            })
        })
        .then(result => {
            console.log('successfully checkout cart')
            return res.status(200).json({
                message: 'successfully checkout cart'
            })
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = CartController