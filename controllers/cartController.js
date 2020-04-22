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
              res.status(201).json({cart})
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
        res.status(200).json({cart})
      })
      .catch(next)
  }

  static increase(req, res, next) {
    Cart.update({
      quantity: sequelize.literal('quantity + 1')
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    .then((cart) => {
      res.status(200).json(cart[1][0])
    })
    .catch(next)
  }

  static decrease(req, res, next) {
    Cart.update({
      quantity: sequelize.literal('quantity - 1')
    }, {
      where: {
        id: req.params.id
      },
      returning: true
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