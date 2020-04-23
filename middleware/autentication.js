const { decodeToken } = require('../helper/jwt')
const { User } = require('../models')

function autentication(req, res, next) {
  try {
    const payload = decodeToken(req.headers.access_token)
    // console.log(payload);
    User.findOne({
      where: {
        id: payload.id
      }
    })
      .then((result) => {
        if (result) {
          req.CurrentUserId = result.id
          return next()
        } else {
          return next({
            name: 'NotFound',
            errors: [{
              type: 404,
              message: 'not found please login first'
            }]
          })
        }
      })
      .catch((err) => {
        return next({
          name: 'NotAutenticate',
          errors: [{
            type: 401,
            message: 'User not autenticate'
          }]
        })
      })

  } catch (err) {
    return next(err)
  }
}

module.exports = {
  autentication
}