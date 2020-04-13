const {Product} = require('../models')
function author(req,res,next){

    Product.findbyPK(req.currentUserId)
    .then(result=>{
        return next()
    })
    .catch(err=>{
        return res.status(401).json({
            'type':'Unauthorized',
            'msg':"Unauthorized"
        })
    })
}
module.exports = author