const { User } = require('../models')
const { encodeToken } = require('../helper/jwt.js')
const { decodePassword } = require('../helper/bcyript.js')

class Controller {

  static register(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password,
      level: req.body.level
    }
    console.log(user);
    User.create(user)
      .then((result) => {
        const payload = {
          id: result.id,
          password: result.password
        }
        const token = encodeToken(payload)

        return res.status(201).json({
          id: result.id,
          email: result.email,
          // access_token : token
        })
      })
      .catch((err) => {
        return next(err)
      })
  }

  static login(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: user.email
      }
    })
      .then((result) => {
        if (result) {
          const compare = decodePassword(req.body.password, result.password)
          if (compare) {
            const payload = {
              id: result.id,
              password: result.password
            }
            const token = encodeToken(payload)
            return res.status(200).json({
              access_token: token
            })
          } else {
            return next({
              name: 'NotFound',
              errors: [{
                status: 404,
                message: 'Email/Password Salah'
              }]
            })
          }
        } else {
          return next({
            name: 'NotFound',
            errors: [{
              status: 404,
              message: 'Email/Password Salah'
            }]
          })
        }
      })
      .catch((err) => {
        return next(err)
      })
  }

  static findAll(req, res, next) {
    User.findAll()
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err)=>{
        return next(err)
      })
  }

  static put(req, res, next) {

  }

  static delete(req, res, next) {

  }
}

module.exports = Controller