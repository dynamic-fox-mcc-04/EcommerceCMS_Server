const { Product } = require('../models')
const del = require('del');

class Controller {
  static findAll(req, res, next) {
    Product.findAll()
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        return next(err)
      })
  }

  static create(req, res, next) {
    const product_Data = {
      product_name: req.body.product_name,
      description: req.body.description,
      image: req.file.filename,
      price: +req.body.price,
      qty: +req.body.quantity,
      Category: req.body.category
    }

    Product.create(product_Data)
      .then((result) => {
        return res.status(201).json(result)
      })
      .catch((err) => {
        console.log(err);
        return next(err)
      })
  }

  static update(req, res, next) {
    const id = req.params.id
    const product_Data = {
      product_name: req.body.product_name,
      description: req.body.description,
      price: +req.body.price,
      qty: +req.body.quantity,
      Category: req.body.category
    }
    console.log(product_Data);
    Product.update(product_Data, {
      where: {
        id
      }
    })
      .then((result) => {
        return res.status(200).json()
      })
      .catch((err) => {
        return next(err)
      })
  }

  static delete(req, res, next) {
    console.log(req.params.id, 'delete');
    const id = req.params.id
    Product.findOne({
      where: {
        id
      }
    })
      .then((result) => {
        const imageName = result.image
        Product.destroy({
          where: {
            id
          }
        })
          .then((result) => {
            del.sync(['./public/'+ imageName]);
            return res.status(200).json({result})
          })
          .catch((err) => {
            return next(err)
          })
      })
      .catch((err) =>{
        return next(err)
      })
  }
}

module.exports = Controller