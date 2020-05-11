const { User } = require('../models')
const { getToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {
  static Signup(req, res, next) {
    let { name, email, password } = req.body
    User.create({
      name,
      email,
      password
    })
      .then((user) => {
        let payload = {
          id: user.id,
          email: user.email
        }
        let token = getToken(payload)
        res.status(201).json({
          name: user.name,
          email: user.email,
          token
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static Signin(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if(user) {
        let status = comparePassword(req.body.password ,user.password)
        if(status) {
          let payload = {
            id: user.id,
            email: user.email
          }
          let token = getToken(payload)
          res.status(200).json({
            name: user.name,
            email: user.email,
            token: token
          })
        }
        else {
          next({ name: 'Invalid email or password'})
        }
      }
      else {
        next({ name: 'Invalid email or password'})
      }
    })
    .catch((err) => {
      next(err)
    })
  }
}

module.exports = UserController