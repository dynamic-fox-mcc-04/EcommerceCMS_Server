const {User} = require('../models')


module.exports = function(req, res, next) {
    console.log('MASUK AUTHORIZE USER')
    User.findOne({
        where: {
            id: req.authenticated.id
        }
    })
        .then(function(result) {
            if(result) {
                if(result.Role == 'User') {
                    console.log('MASUK USER')
                    return next()
                }
                else {
                    let err = {
                        msg: 'Not Authorized'
                    }
                    throw err
                }
            }
            else {
                console.log('MASUK AUTH USER')
                let err = {
                    msg: 'Not Authorized'
                }
                throw err
            }
        })
        .catch(function(err) {
            console.log(err)
            next(err)
        })

}