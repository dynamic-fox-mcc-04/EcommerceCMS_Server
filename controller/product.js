const {Product} = require('../models')

class ProductController{
    static findAll(req, res) {
        Product.findAll({})
        .then(result => {
            res.status(200).json({Product:result})
        })
        .catch(err => res.status(500).json(err))
    }static findByPk(req, res) {
        const {id} =req.params
        Product.findByPk(id)
            .then(result => {
                if(result) {
                    let output = []
                    output.push(result)
                    res.status(200).json({Product:output})
                } else {
                    let output = {
                        error : "Not Found"
                    }
                    res.status(404).json(output)
                }
            })
            .catch(err => res.status(500).json(err))
    }
    static create(req, res) {
        const {name, image_url, price, stock} =req.body
        Product.create({
            name : name,
            image_url: image_url,
            price: price,
            stock: stock,
            // AdminId:req.currentAdminId
        })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                if(err.name == 'SequelizeValidationError' ) {
                    res.status(400).json(err)
                } else {
                    res.status(500).json(err)
                }
            })
    }
    static update(req, res) {
        let idEdit = req.params.id
        const {name, image_url, price, stock} =req.body
        Product.update({
            name : name,
            image_url: image_url,
            price: price,
            stock: stock
        }, {
            where: {
            id: idEdit
            }
        })
            .then((result) => {
                // console.log(result)
                if(result != 0) {
                    let output= [{
                        name : name,
                        image_url: image_url,
                        price: price,
                        stock: stock
                    }]
                    res.status(200).json({Product:output})
                } else {
                    let output = {
                        error : "Not Found"
                    }
                    res.status(404).json(output)
                }
            })
            .catch(err => {
                if(err.name == 'SequelizeValidationError' ) {
                    res.status(400).json(err)
                } else {
                    res.status(500).json(err)
                }
            })
    }
    static delete(req, res) {
        const {id} = req.params
        Product.findByPk(id)
            .then(result => {
                if(result) {
                    Product.destroy({
                        where: {
                            id: id
                        }
                    })
                    .then((result) => {
                        let output = []
                        output.push(result)
                        res.status(200).json({Product:output})
                    })
                } else {
                    let output = {
                        error : "Not Found"
                    }
                    res.status(404).json(output)
                }   
            })
            .catch(err => res.status(500).json(err))
        }
    
}

module.exports= ProductController