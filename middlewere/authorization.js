const { Product } = require('../models')

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

module.exports = {
  adminAuthorization
}