const { User, Cart } = require('../models/index');

function adminAuth(req, res, next) {
    User.findOne({
        where: {
            id: req.currentUserId
        }
    })
        .then(user => {
            if (user.dataValues.role == 'admin') {
                next()
            } else {
                res.status(401).json({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

function customerAuth(req, res, next) {
    console.log('customerAuth =>', req.params.id)
    Cart.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(cart => {
            if (cart) {
                if (cart.UserId == req.currentUserId) {
                    console.log('lannnjuutt')
                    next()
                } else {
                    res.status(401).json({ status: 401, message: "Authorization failed" })
                }
            } else {
                res.status(401).json({ status: 404, message: "Cart not found" })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {
    adminAuth,
    customerAuth
}