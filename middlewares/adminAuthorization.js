const { User } = require("../models/index.js")

function adminAuthorization(req,res,next){
    User.findOne({
        where: {
            id : req.currentUserId
        }
    })
    .then(result => {
        if(result.role == 'admin') {
            return next()
        } else {
            //bukan admin, gak boleh masuk
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

module.exports = adminAuthorization