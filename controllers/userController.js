const {createToken} = require("../helpers/jwt.js")
const { comparePassword } = require("../helpers/bcrypt.js")
const { User } = require("../models/index.js")

class UserController {
    static register(req,res, next){
        //baca dulu req.body (email/password) -- hash password using helpers bcryptjs 
        //-- store datanya dengan create -- handle sisa error-nya
        let { password, email } = req.body
        let payload = {
            password, email,
        }
        User.create(payload)
        .then(result => {
            let user = {
                id : result.id,
                email : result.email, // -- email bukan password
                role: result.role
            }
            let token = createToken(user)
            res.status(201).json({
                id : result.id,
                email: result.email,
                role: result.role,
                access_token:token
            })
        })
        .catch(error => {
            next(error)
            // res.status(500).json({
            //     message:"InternalServerError",
            //     error
            // })
        })
    }
    static login(req,res,next){
        //baca dulu req.body (email/password) -- cari berdasarkan email -- compare password -- kalau ketemu buatin token masuk -- handle sisa error-nya
        let payload = {
            email: req.body.email,
            password: req.body.password
        }
        // console.log('controller', payload)
        User.findOne({where:{
            email : payload.email
        }})
        .then(result => {
            if(result){
                //compare the passwords directly
                let compare = comparePassword(payload.password, result.password)
                if(compare){
                    let user = {
                        id: result.id,
                        email: result.email,
                        role: result.role
                    }
                    let token = createToken(user)
                    res.status(200).json({
                        id : user.id,
                        email : user.email,
                        role: result.role,
                        access_token : token
                    })
                } else {
                    next(
                        ({
                            name:"BadRequest", 
                            errors: [{
                                message: "Invalid email/password"
                            }]    
                        })
                    )
                    // return res.status(400).json({
                    //     name:"BadRequest", 
                    //     errors: [{
                    //         message: "Invalid email/password"
                    //     }]    
                    // })
                }
            } else {
                next(
                    ({
                        name:"BadRequest", 
                        errors: [{
                            message: "Invalid email/password"
                        }]    
                    })
                ) 
                // return res.status(400).json({
                //     name:"BadRequest", 
                //     errors: [{
                //         message: "Invalid email/password"
                //     }]    
                // })
            }
        })
        .catch(err =>{
            next(err)
            // next(
            //     res.status(500).json({ // catch case pakai error handlerr
            //         name:"InternalServerError", 
            //         errors: [{
            //             message: 'Email is required'
            //         }, {
            //             message: 'Password is required'
            //         }]    
            //     })
            // )
            // return res.status(500).json({ // catch case pakai error handlerr
            //     name:"InternalServerError", 
            //     errors: [{
            //         message: 'Email is required'
            //     }, {
            //         message: 'Password is required'
            //     }]    
            // })
        })
    }
}

module.exports = UserController