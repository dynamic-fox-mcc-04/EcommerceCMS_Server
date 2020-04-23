const {User}= require('../models')
const {decryptPassword} = require('../helper/bcrypt')
const {generateToken} =require('../helper/jwt')

class UserController {
    static signup(req, res, next) {
        const {email, password} = req.body
        let payload = {
            email,
            password
        }
        User.create(payload)
            .then(result => {
                let User = {
                    id: result.id,
                    email: result.email
                }
                let token = generateToken(User)
                return res.status(201).json({
                    id: User.id,
                    email: User.email,
                    access_token: token
                })
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static signin(req, res, next) {
        const {email, password} = req.body
        let payload = {
            email,
            password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
            .then(result => {
                if(result) {
                    let compare = decryptPassword(payload.password,result.password)
                    if(compare) {
                        let User = {
                            id: result.id,
                            email: result.email
                        }
                        let token = generateToken(User)
                        res.status(200).json({
                            id: User.id,
                            email: User.email,
                            access_token: token
                        })
                    } else {
                        return next({
                            name: 'BadRequest',
                            errors: [{message: 'Invalid email or password'}]
                        })
                    }
                } else {
                    return next({
                        name: 'BadRequest',
                        errors: [{message: 'Invalid email or password'}]
                    })
                }
            })
            .catch(err => {
                next({
                    name: 'InternalServerError',
                    errors: [{ message: err}]
                })
            })
    }
}

module.exports= UserController