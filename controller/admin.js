const {Admin}= require('../models')
const {decryptPassword} = require('../helper/bcrypt')
const {generateToken} =require('../helper/jwt')

class AdminController {
    static signin(req, res, next) {
        const {email, password} = req.body
        let payload = {
            email,
            password
        }
        Admin.findOne({
            where: {
                email: payload.email
            }
        })
            .then(result => {
                if(result) {
                    let compare = decryptPassword(payload.password,result.password)
                    if(compare) {
                        let Admin = {
                            id: result.id,
                            email: result.email
                        }
                        let token = generateToken(Admin)
                        res.status(200).json({
                            id: Admin.id,
                            email: Admin.email,
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

module.exports= AdminController