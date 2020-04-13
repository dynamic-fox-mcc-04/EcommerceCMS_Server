const {Product} = require("../models")
class Controller{

    static addNew(req,res){
        let data={
            name : req.body.name,
            image_url:req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(data)
        .then(result=>{
            res.status(200).json({
                msg:"Add product Success"
            })
        })
        .catch(err=>{
            res.status(200).json({
                msg:"Add product Fail"
            })
        })
    }
    static Edit(req,res){

    }
    static delete(req,res){

    }
    static viewall(req,res){

    }
    
}
module.exports = Controller
