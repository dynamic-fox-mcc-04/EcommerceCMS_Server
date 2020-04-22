const { Cart } = require('../models')
class CartController {
    static create (req, res, next) {
        const cart = {
            userId: req.currentuserId,
            productId: req.body.productId,
            qty: req.body.qty,
            total: req.body.total,
            status: req.body.status
        }
        Cart.create(cart)
        .then((result) => {
            return res.status(201).json({
                id: result.id,
                userId: result.userId,
                productId: result.productId,
                qty: result.qty,
                total: result.total,
                status: result.status
            })
        }).catch((err) => {
            return next(err)
        });
    }
    static delete (req, res, next) {
        Cart.destroy({
            where: {
                status: false
            }
        })
        .then((result) => {
            return res.status(200).json({
                message: 'Data successfully deleted'
            })
        }).catch((err) => {
            return next(err)
        });
    }
}

module.exports = CartController