const {Product} = require('../models')

class Controller {
    static FetchProduct(req, res, next) {
        Product.findAll()
            .then(function(result) {
                return res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static AddProduct(req, res, next) {
        let {Name, Image_Url, Stock,Price} = req.body
        Product.findOne({
            where: {
                Name
            }
        })
            .then(function(result) {
                if(result) {
                    let err = {
                        msg: 'Item With The Same Name Already Exist'
                    }
                    throw err
                }
                else{
                    return Product.create({
                        Name,
                        Image_Url,
                        Stock,
                        Price
                    })
                }
            })
            .then(function(result) {
                let payload = {
                    Name: result.Name,
                    Image_Url: result.Image_Url,
                    Stock: result.Stock,
                    Price: result.Price
                }
                return res.status(201).json(payload)
            })
            .catch(function(err) {
                console.log(err)
                next(err)
            })
    }

    static UpdateProduct(req, res, next) {
        let {Name, Image_Url, Stock,Price} = req.body
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(result) {
                if(result) {
                    return Product.update({
                        Name,
                        Image_Url,
                        Stock,
                        Price
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }) 

                }
                else {
                    let err = {
                        msg: 'Item Does Not Exist'
                    }
                    throw err
                }

            })
            .then(function(result) {
                return res.status(201).json({
                    msg: 'Successfully Update the Product'
                })
            })
            .catch(function(err) {
                next(err)
            })
    }

    static DeleteItem(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(result) {
                if(result) {
                    return Product.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                }
                else {
                    console.log('masuk else')
                    let err = {
                        msg: 'Item Does Not Exist'
                    }
                    throw err
                }
            })
            .then(function(result) {
                res.status(201).json({
                    msg: 'Successfully Deleted the Product'
                })
            })
            .catch(function(err) {
                next(err)
            })
    }
}

module.exports = Controller