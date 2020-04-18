let {verifyToken} = require("../helpers/jwt.js")
const { User } = require("../models/index.js")

function authentication(req,res,next){
    try {
        let decoded = verifyToken(req.headers.access_token)
        User.findOne({where:{
            id: decoded.id
        }})
        .then(result => {
            //berhasil  : data orang sign in ketemu di db
            //errors    : error kalau user gak ketemu, kalau token salah, kalau findOne gagal proses
            if(result){
                // jika ketemu, tampung id-nya di req.currentUserId untuk penggunaan ke depan. 
                // Kemudian next ke todo user
                // req.currentUserRole = result.role // payload di userController sign in method harusnya mengandung id, email, dan role setelah log in
                req.currentUserId = result.id
                return next()
            } else {
                //error : kalau user tidak ketemu
                return next({
                    name:"User Not Found", 
                    errors: [{message: "User Not Found"}]
                })
            }
        })
        .catch(_ => {
            console.log(_)
            //error : kalau prosesfindOne gagal karena user tidak registered
            res.status(401).json({
                name:"Unauthorized", 
                error: [{message: "User unauthenticated"}]
            })
        })
    }
    catch(err){
        console.log("--------------------------")
        console.log(err)
        //error: gagal decode karena tokennya malformed/tidak pas dengan secret string
        return res.status(500).json({
            name: "Internal Server Error",
            error: [{message: err}]
        })
    }
}

module.exports = authentication