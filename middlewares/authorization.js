const { Product } = require("../models/index.js")

function authorization(req,res,next){
    console.log("+++++++++++++++++++++++++++")
    Product.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(result => {
        if(result){
            console.log(req.currentUserId)
            //for cms, chcek if currentUserRole yang ditampung di authentication adalah "admin"
            if(result.userId == req.currentUserId){
                return next()
            } else {
                res.status(401).json({
                    name:"Unauthorized", 
                    error: [{message: "User unauthenticated"}]
                })
            }
        } else {
            return next({
                name:"User Not Found", 
                errors: [{message: "User Not Found"}]
            })
        }
    })
    .catch(error =>{
        res.status(500).json({
            name: "Internal Server Error",
            error: [{message: error}]
        })
    })
}

module.exports = authorization