const { Product } = require('../models')

class Controller {

    static read(req, res, next){

        Product.findAll({
            where : { UserId : req.userId}
        })
        .then(result => {
            return res.status(200).json({
                products : result
            })
        })
        .catch(err => {
            return next()
        })


    }

    static create(req, res, next){

        const { name, image_url, price, stock} = req.body

        Product.create({
            name,
            image_url,
            price,
            stock
        })
        .then( result =>{

            return res.status(201).json({
                message : 'Success create product'
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static update(req, res, next){

        const { name, image_url, price, stock} = req.body

        Product.update({
            name,
            image_url,
            price,
            stock
        }, {
            where : { id : req.params.id}
        })
        .then(result => {
            return res.status(200).json({
                message : 'Success update product'
            })
        })
        .catch(err => {
            return next(err)
        })
    }

    static delete(req, res, next){

        Product.destroy({
            where : { id : req.params.id}
        })
        .then(result => {
            return res.status(200).json({
                message : 'Success delete product'
            })
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = Controller