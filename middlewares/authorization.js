const { Product } = require('../models')

function authorization(req, res, next) {
    Cart.findOne({ where: { id: req.params.id } })
        .then(response => {
            if(response) {
                if(response.UserId === req.user.id) {
                    return next()
                } else {{
                    throw { status: 401, type: 'Unauthorized', message: 'User does not have access to this item' }
                }}
            } else {
                throw { status: 404, type: '404 Not Found', message: 'User not found' }
            }
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = authorization