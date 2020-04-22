const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')
const { Op } = require('sequelize')

function authentication( req, res, next ) {
    try{
        let decoded = verifyToken(req.headers.access_token)
        User.findOne({
            where: {
                [Op.and]: [
                    {id: decoded.id}
                    // ,
                    // {role: 'admin'}
                ]
            }
        })
            .then( result => {
                if (result) {
                    req.currentUserId = result.id
                    return next()
                } else {
                    return next({
                        name: "NotFound",
                        errors: [{ message: 'User not found' }]
                    })
                }
            })
            .catch( err => {
                return next({
                    name: "Unauthorized",
                    errors: [{ message: 'Unauthorized'}]
                })
            })
    } catch(err) {
        return next(err)
    }
}

module.exports = authentication