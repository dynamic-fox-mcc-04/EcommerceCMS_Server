const { User } = require("../models/index.js")

function authorization(req,res,next){
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
            res.status(401).json({
                name:"Unauthorized", 
                error: [{message: "User unauthenticated"}]
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            name: "Internal Server Error",
            error: [{message: error}]
        })
    })
}

module.exports = authorization