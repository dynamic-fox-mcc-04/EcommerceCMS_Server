const { Product, Cart } = require('../models')

function adminAuthorization(req, res, next) {
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((product) => {
    if(product) {
      return next()
    } else {
      return res.status(401).json({ message: `Unauthorized`})
    }
  })
  .catch((err) => {
    res.status(401).json({ message: `Unauthorized`})
  })
}

function userAuthorization(req, res, next) {
  Cart.findOne({
    where: {
      id: req.params.id,
      UserId: req.currentUserId
    }
  })
  .then((cart) => {
    if(cart) {
      next()
    } else {
      res.status(401).json({ message: `Unauthorized`})
    }
  })
  .catch((err) => {
    res.status(401).json({ message: `Unauthorized`})
  })
}

module.exports = {
  adminAuthorization,
  userAuthorization
}