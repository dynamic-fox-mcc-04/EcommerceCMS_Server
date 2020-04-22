const { Task } = require('../models')

function authorization(req, res, next) {
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
        .then( result => {
            if (result) {
                if (result.UserId == req.currentUserId)
                    return next()
                else {
                    return next({
                        name: 'Unauthorized',
                        errors: [{ message: 'User Not Authorized' }]
                    })
                }
            } else {
                return next({
                    name: 'NotFound',
                    errors: [{ message: 'Task Not Found' }]
                })
            }
        })
}

module.exports = authorization