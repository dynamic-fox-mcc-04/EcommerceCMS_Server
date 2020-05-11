const { Customer } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res, next){
        const {fname, lname, address, phone, email, password} = req.body

        let payload = {
            fname,
            lname,
            address,
            phone,
            email,
            password
        }
        Customer.create(payload)
        .then(result => {
            return res.status(201).json({
                name: result.fname,
                email: result.email
            })
        })
        .catch(err => {
            return next(err)
        })

    }

    static login(req, res, next){

        Customer.findOne({ where : { email : req.body.email}})
        .then(result => {
            if (result) {
                if (compare(req.body.password, result.password)) {
                    let payload = {
                        id: result.id,
                        email: result.email,
                        name: result.fname
                    }

                    let token = generateToken(payload)

                    return res.status(200).json({
                        name: result.fname,
                        customer_token: token
                    })
                } else {
                    return next({
                        name: 'bad request',
                        errors: [{message: 'invalid email/password'}]
                    })
                }
            } else {
                return next({
                    name: 'bad request',
                    errors: [{message: 'invalid email/password'}]
                })
            }
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = Controller