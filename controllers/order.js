const { Order, Product, CartProduct } = require('../models')
const { Op, Sequelize } = require('sequelize')

class Controller {

    static readCart(req, res, next){
        Order.findAll({
            where: {
                [Op.and] : [{
                    CustomerId: req.customerId,
                    status: false
                }]
            },
            include:[{
                model: Product
            }
        ]
        })
        .then(orders => {
            
            if (orders){
             CartProduct.findAll({
                 where: {
                     OrderId: orders[0].id
                 }
             })
             .then(carts => {
                
                 let results = []  

                 orders.forEach(el => {
                      results.push({
                         products: el.Products.map((prod, index) => {
                             return { price: prod.price, stock: prod.stock, orderId: el.id, ProdId: prod.id, name: prod.name, image_url:prod.image_url,cartId:carts[index].id, qty: carts[index].qty}
                         })
                     })
                 });
                 
                  return res.status(200).json({
                           results
                    })

             })
             .catch(err => {
                 return next(err)
             })

            } else {
                return next({
                    name: 'Not found',
                    errors: [{message: 'order item not found'}]
                })
            }
        })
        .catch(err => {
            return next(err)
        })

    }

    static create(req, res, next){
        
        const { productId, quantity } = req.body

        Order.findOne({
            where: {
                [Op.and] : [{
                    CustomerId: req.customerId,
                    status: false
                }]
                
            }
        })
        .then( result => {
            if (result) {
                if (result.status === false){
                    CartProduct.create({
                        ProductId: productId,
                        OrderId: result.id,
                        qty: quantity
                    })
                    .then(() => {
                        return res.status(201).json({
                            message: 'success add product to chart'
                        })
                    })
                    .catch(err => {
                        return next(err)
                    })
                }
            } else {
                let payload = {
                    CustomerId: req.customerId,
                    date: new Date(),
                    total: 0
                }

                Order.create(payload)
                .then(order => {
                    CartProduct.create({
                        ProductId: productId,
                        OrderId: order.id,
                        qty: quantity
                    })
                    .then(() => {
                       return res.status(201).json({
                            message: 'success add product to chart'
                        })
                    })
                    .catch(err => {
                        return next(err)
                    })
                })
                .catch(err => {
                    return next(err)
                })
            }
        })
        .catch(err => {
            return next(err)
        })

    }

    static checkout(req, res, next){
       const { products } = req.body
       Order.update({
        status: true
       }, {
           where: {
               id: req.params.orderId
            }
        })
        .then(() => {
            return Promise.all(products.map(el => {
              
              Product.findByPk(el.prodId)
              .then(product => {
                  return product.decrement(['stock'], {by: el.qty})
              })
              .catch(err => {
                  return next(err)
              })
            }))
            .then(() => {
               return res.status(200).json({
                    message: 'Success update'
                })
            })
            .catch(err => {
                return next(err)
            })
        })

    }

    static delete(req,res,next) {
          
        CartProduct.destroy({
            where: {
                id: req.params.cartId
            }
        })
        .then(result => {
            return res.status(200).json({
                message: 'Success delete item'
            })
        })
        .catch(err => {
            return next(err)
        })

    }

}

module.exports = Controller


