const {Product} = require("../models")
class Controller{

    static addNew(req,res,next){
        let data={
            name : req.body.name,
            image_url:req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
       
        Product.create(data)
        .then(result=>{
            let payload ={
                id:result.id,
                name:result.name,
                price:result.price,
                stock:result.stock
            }
            res.status(201).json(payload
            )
        })
        .catch(err=>{
            next(err)
        })
    }
    static Edit(req,res,next){
        let data={
            name : req.body.name,
            image_url:req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update({data},{
            where:{id:req.params.id
        }})
        .then(result=>{
            res.status(201).json({
                msg:"Update Success"
            })
        })
        .catch(err=>{
           next(err)
        })
    }
    static delete(req,res){
        Product.destroy({
            where:{
                id:req.params.id
            }
        })
        .then(result=>{
            console.log(result);
            
            res.status(201).json({
                msg:"Delete Success"
            })
        })
        .catch(err=>{
           next(err)
        })
    }
    static viewall(req,res){
        Product.findAll()
        .then(result=>{         
                          
            res.status(201).json(result)
        })
        .catch(err=>{
           next(err)
        })
    }
    
}
module.exports = Controller
