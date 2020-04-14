const { User } = require('../models')
const { getToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class AdminController {
  static signup(req, res, next) {    
    let { name, email, password } = req.body
    User.create({
      name,
      email,
      password,
      admin: true
    })
      .then((user) => {
        let payload = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        let token = getToken(payload)
        res.status(201).json({
          name: user.name,
          email: user.email,
          token
        })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (user) {
          let status = comparePassword(req.body.password, user.password)
          if (status) {
            if (user.admin) {
              let payload = {
                id: user.id,
                name: user.name,
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
              next({ name: 'Admin only!' })
            }
          }
          else {
            next({ name: 'Invalid email or password' })
          }
        }
        else {
          next({ name: 'Invalid email or password' })
        }
      })
      .catch(next)
  }
}

module.exports = AdminController