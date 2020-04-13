const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'tralala' //ngga kebaca process.env di jest nya,jadinya declare begini
class UserController {
    static Register(req, res, next) {
        console.log(req.body)
        let {Email, Password} = req.body
        User.findOne({
            where: {
                Email
            }
        })
            .then(function(result) {
                if(result) {
                    let err = {
                        msg: 'Email Already Exist'
                    }
                    throw err
                }
                else {
                    return User.create({
                        Email,
                        Password,
                        Role: "User"
                    })  
                }
            })
        
            .then(function(result) {
                return res.status(201).json({
                    Email: result.Email,
                    msg: 'Register Success'
                })
            })
            .catch(function(err) {
                next(err)
            })

    }

    static Login(req, res, next) {
        let {Email, Password} = req.body
        User.findOne({
            where: {
                Email
            }
        })
            .then(function(result) {
                if(result) {
                    let status = bcrypt.compareSync(Password, result.Password)
                    if(status) {
                        console.log(process.env.SECRET)
                        let payload = {
                            access_token: jwt.sign({
                                Email: result.Email,
                                id: result.id
                            }, SECRET),
                            Email: result.Email
                        }
                        return res.status(200).json(payload)
                    }
                    else {
                        let err = {
                            msg: 'Wrong Email / Password'
                        }
                        throw err
                    }
                }
                else {
                    let err = {
                        msg: 'Wrong Email / Password'
                    }
                    throw err
                }
            })
            .catch(function(err) {
                next(err)
            })
    }
}

module.exports = UserController