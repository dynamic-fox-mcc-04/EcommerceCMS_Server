const {User} = require('../models')


module.exports = function(req, res, next) {
    User.findOne({
        where: {
            id: req.authenticated.id
        }
    })
        .then(function(result) {
            if(result) {
                if(result.Role == 'Admin') {
                    next()
                }
                else {
                    let err = {
                        msg: 'Not Authorized'
                    }
                    throw err
                }
            }
            else {
                let err = {
                    msg: 'Not Authorized'
                }
                throw err
            }
        })
        .catch(function(err) {
            next(err)
        })

}