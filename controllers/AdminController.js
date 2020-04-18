const { Admin } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
class AdminController {
    static login(req, res, next) {
        const getdata = {
            email: req.body.email,
            password: req.body.password
        }
        Admin.findOne({
                where: {
                    email: getdata.email
                }
            })
            .then((result) => {
                if (result) {
                    let decode = compare(getdata.password, result.password)
                    if (decode) {
                        let payload = {
                            id: result.id,
                            email: result.email
                        }
                        let access_token = generateToken(payload)
                        return res.status(200).json({
                            id: payload.id,
                            email: payload.email,
                            access_token,
                            isAdmin: result.isAdmin
                        })
                    } else {
                        return next({
                            name: 'BadRequest',
                            errors: [{ message: 'Invalid Email/Password' }]
                        })
                    }
                } else {
                    return next({
                        name: 'BadRequest',
                        errors: [{ message: 'Invalid Email/Password' }]
                    })
                }
            })
            .catch((err) => {
                return next({
                    name: 'InternalServerError',
                    errors: [{ message: err }]
                })
            })
    }
}

module.exports = AdminController