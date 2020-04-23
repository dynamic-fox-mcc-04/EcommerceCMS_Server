const {Cart, Product} = require('../models')

class Controller{
  static findAll(req, res, next){

  }
  static findByUser(req, res, next){
    Cart.findAll({
      where: {
        UserId: req.CurrentUserId
      },
      order: [
        ['id', 'DESC'],
      ],
      include: [
        {
          model: Product,
          required : true,
        }
      ]
    })
      .then((result)=>{
        return res.status(200).json(result)
      })
      .catch((err)=>{
        return next(err)
      })
  }
  static create(req, res, next){
    const cart = {
      UserId : req.CurrentUserId,
      ProductId : +req.body.ProductId,
      qty: +req.body.qty
    }
    Cart.create(cart)
      .then((result)=>{
        return res.status(201).json(result)
      })
      .catch((err)=>{
        return next(err)
      })
  }
  static patchUpdate(req, res, next){
    const id = +req.params.id
    const quantity =  {
      qty: req.body.qty
    }
    console.log(quantity, id);
    Cart.update(quantity, {
      where: {
        id
      }
    })
      .then((result)=>{
        return res.status(201).json(result)
      })
      .catch((err)=>{
        return next(err)
      })
  }
  static delete(req, res, next){
    const id = req.params.id
    Cart.destroy({
      where:{
        id
      }
    })
      .then((result)=>{
        return res.status(200).json(result)
      })
      .catch((err)=>{
        return next(err)
      })
  }
}

module.exports = Controller