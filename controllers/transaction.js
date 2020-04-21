const {Detail_customer,Transaction,Product} = require("../models")
class Controller{

    static checkOut(req,res,next){
        let data={
            ProductsId:req.body.ProductsId,
            Customer_detailsId:req.currentUserId,
            price:req.body.price,
            status:"Pending",
            payment_method:"Pending",
            Master_transactionsId:1
        }
       
        Transaction.create(data)
        .then(result=>{
            let payload ={
                result
            }
            res.status(201).json(payload
            )
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static confirm(req,res,next){
       
        Transaction.update({status:'Done'},{
            where:{
                id:req.body.id
                }
            })
        .then(result=>{
            res.status(201).json({
                msg:"Transaction Done Success"
            })
        })
        .catch(err=>{
            console.log(err);
            
           next(err)
        })
    }
    static delete(req,res){
       Transaction.destroy({
           where:{
               id:req.body.id
           }})
           .then(reponse=>{
                res.status(201).json({
                    msg:"Delete Success"
                })
           })
        
    }
   
    
}
module.exports = Controller
