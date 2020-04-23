const {Cart} = require('../models')

class CartController{
    static findAll(req, res) {
        Cart.findAll({
            where: {
                UserId: req.currentUserId,
                isPaid:false
            }
        })
        .then(result => {
            console.log(result.id)
            res.status(200).json({Cart:result})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }static findByPk(req, res) {
        const {id} =req.params
        Cart.findByPk(id)
            .then(result => {
                if(result) {
                    let output = []
                    output.push(result)
                    res.status(200).json({Cart:output})
                } else {
                    let output = {
                        error : "Not Found"
                    }
                    res.status(404).json(output)
                }
            })
            .catch(err => res.status(500).json(err))
    }
    static create(req, res) {
        const {name, image_url, quantity, ProductId,price} =req.body
        Cart.findOne({
            where: {
                UserId: req.currentUserId,
                isPaid: false,
                ProductId: ProductId,
                name:name
            }
        })
            .then((result) => {
                // console.log(result)
                if(result) {
                    Cart.update({
                        quantity:Number(quantity) + result.quantity
                    }, {
                        where: {
                            UserId: req.currentUserId,
                            isPaid: false,
                            ProductId: ProductId
                        }
                    })
                        .then((result) => {
                            res.status(200).json({message:'success'})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    Cart.create({
                        name : name,
                        image_url: image_url,
                        quantity: quantity,
                        UserId:req.currentUserId,
                        ProductId,
                        price:price
                    })
                        .then(result => {
                            res.status(201).json(result)
                        })
                        .catch(err => {
                            if(err.name == 'SequelizeValidationError' ) {
                                res.status(400).json({
                                    name:err.name,
                                    errors:err.errors.map(el=>{
                                        return {message:el.message}
                                    })
                                })
                            } else {
                                res.status(500).json(err)
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
    static update(req, res) {
        // console.log('masuk')
        let idEdit = req.params.id
        // const {isPaid} =req.body
        Cart.update({
            isPaid: true
        }, {
            where: {
            ProductId: idEdit,
            isPaid: false
            }
        })
            .then((result) => {
                // console.log(result)
                if(result != 0) {
                    res.status(200).json({message:'success'})
                } else {
                    let output = {
                        error : "Not Found"
                    }
                    res.status(404).json(output)
                }
            })
            .catch(err => {
                if(err.name == 'SequelizeValidationError' ) {
                    // console.log(err.errors)
                    res.status(400).json({
                        name:err.name,
                        errors:err.errors.map(el=>{
                            return {message:el.message}
                        })
                    })
                } else {
                    console.log(err)
                    res.status(500).json(err)
                }
            })
    }
    static delete(req, res) {
        const {id} = req.params
        Cart.findOne({
            where: {
                ProductId:id,
                isPaid: false
            }
        })
            .then(result => {
                if(result) {
                    Cart.destroy({
                        where: {
                            ProductId: id
                        }
                    })
                    .then((result) => {
                        let output = []
                        output.push(result)
                        res.status(200).json({Cart:output})
                    })
                } else {
                    let output = {
                        errors : "Not Found"
                    }
                    res.status(404).json(output)
                }   
            })
            .catch(err => res.status(500).json(err))
        }
}

module.exports= CartController