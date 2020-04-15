const models = require('../models')
const { decryptPassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body
        const newAccount = { username, email, password }
        if (req.body.role == '') {
            newAccount.role = 'customer'
        } else {
            newAccount.role = req.body.role
        }
        return models.User.create(newAccount)
            .then(result => {
                return res.status(201).json({
                    id: result.id,
                    email: result.email
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next) {
        console.log(`controller login`)
        const { email, password } = req.body
        const account = { email, password }
        return models.User.findOne({ where: { email } })
            .then(result => {
                if (result) {
                    let compare = decryptPassword(password, result.password)
                    if (compare) {
                        let payload = {
                            id: result.id,
                            email: result.email,
                            role: result.role
                        }
                        let token = generateToken(payload)
                        return res.status(200).json({
                            id: payload.id,
                            email: payload.email,
                            role: payload.role,
                            token
                        })
                    } else {
                        return next({
                            name: `BadRequest`,
                            errors: [{ message: `email/password is wrong` }]
                        })
                    }
                } else {
                    return next({
                        name: `BadRequest`,
                        errors: [{ message: `email/password is wrong` }]
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UserController