const { User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class Controller {
    static register (req, res, next) {
        const { email, password, role } = req.body
        const newUser = { email, password, role }
            User.create(newUser)
                .then( created => {
                    return res.status(201).json({
                        id: created.id,
                        email: created.email,
                        message: 'Successfully registered new user'
                    })
                })
                .catch( err => {
                    return next(err)
                })
    }

    static login(req, res, next) {
        let { email, password } = req.body
        let payload = { email, password }
        User.findOne({
            where: {
                email: payload.email
            }
        })
            .then( found => {
                if (found) {
                    let compare = decryptPass(payload.password, found.password)
                    if (compare) {
                        let { id, email } = found
                        let foundPayload = { id, email }
                        let token = generateToken(foundPayload)
                        return res.status(200).json({
                            access_token: token
                        })
                    } else {
                        return next({
                            name: 'BadRequest',
                            errors: [{ message: 'Invalid email / password' }]
                        })
                    }                    
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'User not found' }]
                    })
                }
            })
            .catch( err => {
                return next(err)
            })
    }

    static findAll (req, res, next) {
        User.findAll({
            orders: [
                ['role', 'ASC']
            ]
        })
            .then(result => {
                res.status(200).json({ result })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = Controller