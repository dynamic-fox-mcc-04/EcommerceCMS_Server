const {Trans,Project} = require("../models")
class Controller{

    static addCart(req,res,next){
        let data={
            ProductId:req.body.id,
            CustomerDetailId:req.headers.idalamat,
            MasterTransactionId:1,
            price:req.body.price,
            status:"Pending",
            payment_method:"Pending"
        }
       console.log('>>>>>>>>',data);
       
        Trans.create(data)
        .then(result=>{
            let payload ={
                result
            }
            res.status(201).json(payload
            )
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
    
    static confirm(req,res,next){
       
        Trans.update({status:'Done'},{
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
       Trans.destroy({
           where:{
               id:req.body.id
           }})
           .then(reponse=>{
                res.status(201).json({
                    msg:"Delete Success"
                })
           })
        
    }
    static viewpending (req,res) {
        Trans.findAll({
            where:{
                CustomerDetailId: req.headers.idalamat,
                status: 'Pending'
                },
                include:["Product"]
        })
        .then(result=>{
            res.status(201).json({
                data:result
            })
        })
        .catch(err=>{
            console.log(err);
            
        })
    }
   
    
}
module.exports = Controller
