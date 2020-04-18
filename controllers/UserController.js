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
        const { email, password } = req.body;
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

    static loginAdmin(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: {
                email,
                role: 'admin'
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
                return next({
                    status: 401,
                    message: 'Not Authorized'
                })
            })
    }

    static findAll(req, res, next) {
        User.findAll({
            order: [['updatedAt', 'DESC']]
        })
            .then(data => {
                let users = [];
                data.map(el => {
                    if(el.role !== 'admin') {
                        users.push(el)
                    }
                })
                return res.status(200).json(users)
            })
            .catch(err => {
                return next(err)
            })
    }

    static delete(req, res, next) {
        let id = req.params.id;
        console.log('masuk sini ga',id);
        User.findByPk(id)
            .then(data => {
                console.log(data)
                if(data.role == 'customer') {
                    return User.destroy({
                        where: { id }
                    })
                } else {
                    return next({
                        status: 403,
                        message: 'only customer can be deleted by admin'
                    })
                }
            })
            .then(_ => {
                return next({
                    message: 'User successfully deleted'
                })
            })
            .catch(err => {
                return next(err);
            })
    }
}

module.exports = UserController;