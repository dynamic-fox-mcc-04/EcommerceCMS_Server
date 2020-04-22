const { Cart, Product, sequelize } = require('../models')

class CartController {
  static create(req, res, next) {
    Cart.findOne({
      where: {
        ProductId: req.body.ProductId,
        UserId: req.currentUserId
      }
    })
      .then((cart) => {
        if (cart) {
          return Cart.update({
            quantity: sequelize.literal('quantity + 1')
          }, {
            where: {
              ProductId: req.body.ProductId,
              UserId: req.currentUserId
            },
            returning: true
          })
            .then((updatedCart) => {
              res.status(200).json(updatedCart[1][0])
            })
        }
        else {
          return Cart.create({
            ProductId: req.body.ProductId,
            UserId: req.currentUserId,
            quantity: 1
          })
            .then((cart) => {
              res.status(201).json({ cart })
            })
        }
      })
      .catch(next)
  }

  static display(req, res, next) {
    Cart.findAll({
      where: {
        UserId: req.currentUserId
      },
      order: [['createdAt', 'DESC']],
      include: [Product]
    })
      .then((cart) => {
        res.status(200).json({ cart })
      })
      .catch(next)
  }

  static increase(req, res, next) {
    let cartQuantity;
    Cart.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((cart) => {
        cartQuantity = cart.quantity
        if (cart) {
          return Product.findOne({
            where: {
              id: cart.ProductId
            }
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .then((product) => {
        if (product) {
          if (product.stock > cartQuantity) {
            return Cart.update({
              quantity: sequelize.literal('quantity + 1')
            }, {
              where: {
                id: req.params.id
              },
              returning: true
            })
          }
          else {
            next({ name: 'Quantity out of stock' })
          }
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .then((cart) => {
        res.status(200).json(cart[1][0])
      })
      .catch(next)
  }

  static decrease(req, res, next) {
    Cart.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((cart) => {
        if (cart.quantity > 0) {
          return Cart.update({
            quantity: sequelize.literal('quantity - 1')
          }, {
            where: {
              id: req.params.id
            },
            returning: true
          })
        }
        else {
          next({ name: 'Min. quantity is 0' })
        }
      })
      .then((cart) => {
        res.status(200).json(cart[1][0])
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    let deletedCart;
    Cart.findByPk(id)
      .then((cart) => {
        if (cart) {
          deletedCart = cart
          return Cart.destroy({
            where: {
              id: id
            }
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'Delete success',
            deletedCart
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .catch(next)
  }
}

module.exports = CartController