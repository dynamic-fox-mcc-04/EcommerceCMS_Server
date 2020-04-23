const {verifyToken} = require('../helper/jwt')
const {User}= require('../models')

function authentication(req, res, next) {
    try{
        let decoded= verifyToken(req.headers.access_token)
        User.findOne({
            where: {
                id:decoded.id
            }
        })
            .then(result => {
                if(result){
                    req.currentUserId= result.id;
                    return next()
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ message : 'User not found'}]
                    })
                }
            })
            .catch(err => {
                return res.status(401).json({
                    type:'Unauthorized',
                    errors: 'Unauthorized'
                })
            })
    } catch(err) {
        console.log(err)
        return next(err)
    }
}

module.exports = authentication