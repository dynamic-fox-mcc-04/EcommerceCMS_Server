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
            //  console.log(orders);
             CartProduct.findAll({
                 where: {
                     OrderId: 1
                 }
             })
             .then(carts => {
                
                 let results = []  

                 orders.forEach(el => {
                      results.push({
                         orderId: el.id,
                         products: el.Products.map((prod, index) => {
                             return { id: prod.id, name: prod.name, image_url:prod.image_url,cart: carts[index].qty}
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
            console.log(err);
            
            return next(err)
        })

    }

    static checkout(req, res, next){
       const { orderId,products } = req.body
       
       Order.update({
        status: true
       }, {
           where: {
               id: orderId
            }
        })
        .then(() => {
            return Promise.all(products.forEach(el => {
              Product.findByPk(el.id)
              .then(product => {
                  return product.decrement(['stock'], {by: el.cart})
              })
              .catch(err => {
                  return next(err)
              })
            })
            )
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

}

module.exports = Controller


