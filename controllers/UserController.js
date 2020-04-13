const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt');

class UserController {
    static register(req, res, next) {
        const { username, email, password } = req.body;
        User.create({
            username,
            email,
            password
        })
            .then(newUser => {
                let payload = {
                    id: newUser.dataValues.id,
                    username: newUser.dataValues.username,
                    email: newUser.dataValues.email
                }
                return res.status(201).json(payload)
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next) {
        const { username, email, password } = req.body;
        User.findOne({
            where: {
                email
            }
        })
            .then(foundUser => {
                const payload = { 
                    id: foundUser.id,
                    username: foundUser.username,
                    email: foundUser.email
                 };
                 const token = generateToken(payload);
                 if(foundUser) {
                     let verify = decrypt(password, foundUser.password);
                     if(verify) {
                        return res.status(200).json({
                            token
                        })
                     } else {
                        return next({
                            status: 400,
                            message: 'Invalid username/email/password'
                        })
                     }
                 } else {
                    return next({
                        status: 400,
                        message: 'Invalid username/email/password'
                    })
                 }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UserController;