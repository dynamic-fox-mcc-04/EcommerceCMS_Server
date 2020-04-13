const {User} = require('../models')
const {encodeToken} = require('../helper/jwt.js')
const {decodePassword} = require('../helper/bcyript.js')

class Controller {

    static register(req, res, next){
        const user = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(user)
            .then((result)=>{
                const payload = {
                    id : result.id,
                    password : result.password
                }
                const token = encodeToken(payload)

                return res.status(201).json({
                    email : result.email,
                    access_token : token
                })
            })
            .catch((err)=>{
                return next(err)
            })
    }

    static login(req, res, next){
        User.findOne({
            where:{
                email: req.body.email
            }
        })
            .then((result)=>{
                if(result){
                    const compare = decodePassword(req.body.password , result.password)
                    if(compare){
                        const payload = {
                            id : result.id,
                            password : result.password
                        }
                        const token = encodeToken(payload)
                        return res.status(200).json({
                            access_token : token
                        })
                    }else{
                        return next({
                            name: 'NotFound',
                            error: [{
                                status: 404,
                                message: 'Email/Password Salah'
                            }]
                        })
                    }
                }else{
                    return next({
                        name: 'NotFound',
                        error: [{
                            status: 404,
                            message: 'Email/Password Salah'
                        }]
                    })
                }
            })
            .catch((err)=>{
                return next(err)
            })
    }

    static findAll(req, res, next){

    }

    static put(req, res, next){

    }

    static delete(req, res, next){

    }
}

module.exports = Controller