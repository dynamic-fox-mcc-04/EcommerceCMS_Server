const { Product } = require('../models')

class ProductController {
  static create(req, res, next) {
    let { name, price, stock, image_Url, category } = req.body
    Product.create({
      name,
      price,
      stock,
      image_Url,
      category
    })
      .then((product) => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static display(req, res, next) {
    Product.findAll({
      order: [['createdAt', 'DESC']]
    })
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          res.status(404).json({ name: 'Product not Found' })
        } else {
          res.status(200).json(product)
        }
      })
      .catch(next)
  }

  static edit(req, res, next) {
    let { name, price, stock, image_Url, category } = req.body
    Product.update({
      name,
      price,
      stock,
      image_Url,
      category
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    })
      .then((newProduct) => {
        if (!newProduct[1]) {
          res.status(404).json({ name: 'Product not Found' })
        } else {
          res.status(200).json(newProduct[1][0])
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    let deletedProduct;
    Product.findByPk(id)
      .then((product) => {
        if (product) {
          deletedProduct = product
          return Product.destroy({
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
            deletedProduct
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .catch(next)
  }
}

module.exports = ProductController