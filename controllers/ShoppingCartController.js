// bisa lihat semua barang yang sudah dimasukkan ke shoppingCart user yang bersangkutan
// bisa tambahkan barang dari shoppingCart
// bisa edit quantity barang dari shoppingCart
// bisa delete barang dari shoppingCart

const { ShoppingCart, User, Product } = require("../models/index.js")

class ShoppingCartController {
  static findAll (req,res,next){
    ShoppingCart.findAll({
        // { attributes: { include: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']] }
        attributes: {include: [[ 'id', 'CartId' ]]},
        where: { UserId : req.currentUserId },
        order: [['UserId', 'ASC']],
        include: [ User, Product ]
    })
    .then(result => {
      res.status(200).json({
          products: result
      })
    })
    .catch(error =>{
        next({
            message:"Internal Server Error",
            error:error
        })
    })
  }
  static findOne (req,res,next){
    
    let { id } = req.params
    ShoppingCart.findOne({
        where:{
        id: id,
        UserId: req.currentUserId
        },
        include: [ User, Product ]
    })
    .then(result => {
        if(result){
            res.status(200).json({
                product:result
            })
        } else {
            next( 
                res.status(404).json({
                    message:"Product not found",
                    errors:"Product not found"
                })
            )
        }
    })
    .catch(error => {
        next(res.status(500).json({
            message:"Internal Server Error",
            error: error
        }))
    })
  }
  static addToCart (req,res,next){
    // console.log("==============ENTERED ADD TO CART==============")
    let { ProductId, quantity } = req.body
    let UserId = req.currentUserId
    let newCartProduct = {
        UserId,
        ProductId,
        quantity
    }
    ShoppingCart.findOne(
        {where: {
            UserId:UserId,
            ProductId:ProductId
        }
    })
    .then(result => {
        if(result){
            ShoppingCart.update(newCartProduct,{
                where:{
                    UserId:UserId,
                    ProductId:ProductId
                }
            })
            .then(result => {
                res.status(201).json({
                    message:"New product successfully added to shopping cart",
                    newCartProduct: result
                }) 
            })
            .catch(error => {
                res.status(500).json({
                    message:"Internal Server Error",
                    error: error
                })
            })
        } else {
            ShoppingCart.create(newCartProduct)
            .then(result => {
                res.status(201).json({
                    message:"New product successfully added to shopping cart",
                    newCartProduct: result
                }) 
            })
            .catch(error => {
                res.status(500).json({
                    message:"Internal Server Error",
                    error: error
                })
            })
        }
    })
    .catch(error => {
        console.log(error)
        next({
            message: "Internal Server Error",
            error: error
        })
    })


    // 1. cari apakah ada ProductId yang sama DAN && UserId yang sama --find one where two attributes
    // 2. kalau ada, cukup pakai update quantity
    // 3. kalau gak ada, pakai create untuk buat update baru
    
    
  }
  static editQuantity (req,res,next){
    let { quantity } = req.body
    let selectedId = req.params.id
    ShoppingCart.findOne({
        where:{
            id: selectedId
        },
        include: [ User, Product ]
    })
    .then(result => {
        console.log(result)
        let updatedCartProduct = {
            UserId: req.currentUserId,
            ProductId: result.ProductId,
            quantity
        }
        ShoppingCart.update(updatedCartProduct, {
            where: {
                id: selectedId
            },
            returning:true
        })
        .then(result => {
            res.status(201).json({
                updatedCartProduct: result
            })
        })
        .catch(error => {
            next({
                message:"Internal Server Error",
                error: error
            })
        })
    })
    .catch(error =>{
        next(error)
    })

  }
  static deleteProduct (req,res,next){
    let {id} = req.params
    ShoppingCart.destroy({
        where: {
            id
        }
    })
    .then(_ => {
        res.status(200).json({
            message: "Selected cart product successfully deleted"
        })
    })
    .catch(error =>{
        next({
            message:"Internal Server Error",
            error: error
        })
    })
  }
  static deleteAllProducts (req,res,next){
      ShoppingCart.destroy({
        where:{}
    })
    .then(result => {
        res.status(200).json({
            message: "Shopping cart successfully emptied"
        })
    })
    .catch(error => {
        next({
            message:"Internal Server Error",
            error: error
        })
    })
  }
    
}

module.exports = ShoppingCartController