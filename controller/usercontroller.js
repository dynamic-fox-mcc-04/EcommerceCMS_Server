const {User} = require('../models')
class UserController {
    static Register(req, res, next) {
        let {Email, Password} = req.body
        User.create({
            Email,
            Password,
            Role: "User"
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
}

module.exports = UserController