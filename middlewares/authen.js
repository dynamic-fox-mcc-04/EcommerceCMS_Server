const verify = require('../helpers/jwt')
const {User} = require('../models')
function Authen(req,res,next){
    try{
        let decode = verify(req.headers.token)

        User.findOne({
            where:{
                id:decode.id
            }
        })
        .then(result=>{
            req.currentUserId = result.id
            return next()
        })
        .catch(err=>{
            return res.status(404).json({
                'type':'Not found',
                'msg':"User not Found"
            })
        })
    }catch(err){
        return res.status(401).json({
            'type':'Unauthorized',
            'msg':"Unauthorized"
        })
    }
    
}

module.exports = Authen

