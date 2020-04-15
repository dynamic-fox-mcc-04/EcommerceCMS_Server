const  { Product } = require("../models/index.js")

class ProductController {
    static findAll(req,res,next){
        Product.findAll({
            where:{
                userId: req.currentUserId
            }, order: [['id', 'ASC']]
        })
        .then(result =>{
            res.status(200).json({
                products: result
            })
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json({ //Kalau sudah ada errorHandler, gantikan res.status(500).json menjadi return next({error})
                message:"InternalServerError",
                error:error
            })
        })
    }
    static getOneProduct(req,res,next){
        let { id } = req.params
        Product.findByPk(id)
        .then(result => {
            //kalau result ada, cocokkan user id || not found-- kalau cocok, tampilkan  || unauthorized
            if(result){
                console.log(result, req.currentUserId, "TEST")
                if(result.userId == req.currentUserId){
                    res.status(200).json({
                        Product: result
                    })
                } else {
                    res.status(400).json({
                        message:"BadRequest",
                        errors: "Unauthorized request"
                    })
                }
            } else {
                res.status(404).json({
                    message:"Product not found",
                    errors:"Product not found"
                })
            }
        })
        .catch(err =>{
            return next({
                message:"InternalServerError",
                error:err
            })
        })
    }
    static addNewProduct(req,res,next){
        let { name, image_url, price, stock } = req.body
        let userId = req.currentUserId
        let newProduct = {
            name,
            image_url,
            price,
            stock,
            userId: userId
        }
        Product.create(newProduct)
        .then(result =>{
            res.status(201).json({
                message:"Product successfully added",
                newProduct: result
            })
        })
        .catch(error =>{
            console.log(error)
            return next({
                message: "InternalServerError",
                error: error
            })
        })
    }
    static updateProduct (req,res,next){
        let { name, image_url, price, stock } = req.body
        let updatedProduct = {
            name, 
            image_url, 
            price, 
            stock, 
            userId : req.currentUserId
        }
        Product.update(updatedProduct, {
            where:
            {id:req.params.id}, 
            returning:true 
        })
        .then(result =>{
            res.status(201).json({
                updatedProduct : result
            })
        })
        .catch(err =>{
            return next({
                message:"InternalServerError",
                error:err
            })
        })
    }
    static deleteProduct (req,res,next){
        let {id} = req.params
        Product.destroy({where:
            { id }
        })
        .then(_ =>{
            res.status(200).json({
                message: "Product successfully deleted"
            })
        })
        .catch(error =>{
            res.status(500).json({
                message: "InternalServerError",
                error:error
            })
        })
    }
}

module.exports = ProductController