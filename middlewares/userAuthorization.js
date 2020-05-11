const { User } = require("../models/index.js")

function userAuthorization(req,res,next){
    User.findOne({
        where: {
            id : req.currentUserId
        }
    })
    .then(result => {
        if(result.role == 'user') {
            return next()
        } else {
            //bukan user, gak boleh belanja
            next(
                res.status(401).json({
                    message:"Unauthorized Request", 
                    error: [{message: "User unauthorized to make this request"}]
                })
            )
        }
    })
    .catch(error => {
        next(
            res.status(500).json({
                message: "Internal Server Error",
                error: error
            })
        )
    })
}

module.exports = userAuthorization