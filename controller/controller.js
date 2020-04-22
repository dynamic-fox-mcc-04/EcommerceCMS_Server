const {Product, Cart, Order} = require('../models')

class Controller {
    static FetchProduct(req, res, next) {
        Product.findAll({
            order: [['id', 'DESC']]
        })
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
        console.log(req.body)
        console.log(req.params.id)
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

    static getDetails(req, res, next) {
        console.log(req.params.id)
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(result) {
                return res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
    }
//Client User Controllers
    static GetCart(req, res ,next) {
        console.log('MASUK CART')
        Cart.findAll({
            where: {
                UserId: req.authenticated.id
            },
            include: ['User', 'Product']
        })
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static AddCart(req, res, next) {
        let data = req.body
        data.UserId = req.authenticated.id
        Cart.findOne({
            where: {
                ProductId: data.ProductId,
                UserId: data.UserId
            }
        })
            .then(function(result) {
                if(result) {
                    //Update Kalau Ada
                    data.Quantity = Number(data.Quantity) + Number(result.Quantity)
                    return Cart.update({
                        UserId: data.UserId,
                        ProductId: data.ProductId,
                        Quantity: data.Quantity
                    }, {
                        where: {
                            ProductId: data.ProductId,
                            UserId: data.UserId
                        }
                    })
                }
                else {
                    //Create karena ga ada
                    return Cart.create({
                        UserId: data.UserId,
                        ProductId: data.ProductId,
                        Quantity: data.Quantity
                    })
                }
            })
            .then(result => {
                return res.status(201).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static UpdateCart(req, res, next) {
        let data = req.body
        data.UserId = req.authenticated.id
        Cart.update({
            UserId: data.UserId,
            ProductId: data.ProductId,
            Quantity: data.Quantity

        }, {
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                return res.status(201).json({
                    msg: 'Successfully Update Cart'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static DeleteCart(req, res, next) {
        Cart.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                if(result) {
                    return Cart.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                }
                else {
                    let err = {
                        msg: 'Cart Does not Exist'
                    }
                    throw err
                }
            })
            .then(result => {
                return res.status(201).json({
                    msg: 'Successfully Delete Cart'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static Checkout(req, res, next) {
        let data;
        let UpdatedProduct;
        let ordercreate
        Cart.findAll({
            where: {
                UserId : req.authenticated.id
            }
        })
            .then(function(result) {
                data = result
                //data untuk isi cart nya
                let promises = []
                //PROMISE ALL START
                for(let i = 0; i < result.length; i++) {
                    console.log(result[i].ProductId)
                    const promise = new Promise(function(resolve, reject) {
                        Product.findOne({
                            where: {
                                id: result[i].ProductId
                            }
                        })
                            .then(function(product) {
                                if(product) {
                                    if(product.Stock >= result[i].Quantity) {
                                        product.Stock = Number(product.Stock) - Number(result[i].Quantity)
                                        resolve(product)
                                    }
                                    else {
                                        reject({
                                            msg: "Insufficient Stock",
                                            id: product.id,
                                            Stock: product.Stock
                                        })
                                    }
                                }
                                else {
                                    reject({
                                        msg: "Product with this id not found",
                                        id: result[i].ProductId
                                    })
                                }
                            })
                            .catch(function(err) {
                                reject(err)
                            })
                    })
                    promises.push(promise)
                }
                //PROMISE ALL END
                return Promise.all(promises)
            })
            .then(function(result) {
                UpdatedProduct = result
                let updateprom = []
                for(let i = 0; i < result.length; i++) {
                    const updprom = new Promise(function(resolve, reject) {
                        Product.update({
                            Name: result[i].Name,
                            Image_Url: result[i].Image_Url,
                            Price: result[i].Price,
                            Stock: result[i].Stock
                        }, {
                            where: {
                                id: result[i].id
                            }
                        })
                        .then(function(result) {
                            console.log(result)
                            resolve(result) 
                        })
                        .catch(function(err) {
                            reject(err)
                        })
                    })
                    updateprom.push(updprom)
                }
                return Promise.all(updateprom)

            })
            .then(function(result) {
                //Promise All Order Create
                let orderpromise = []
                for(let i = 0; i < data.length; i++) {
                    const ordpromise = new Promise(function(resolve, reject) {
                        Order.create({
                            UserId: data[i].UserId,
                            ProductId: data[i].ProductId ,
                            Quantity: data[i].Quantity,
                            TotalPrice: Number(data[i].Quantity) * UpdatedProduct[i].Price,
                        })
                            .then(function(result) {
                                resolve(result)
                            })
                            .catch(function(err) {
                                reject(err)
                            })
                    })
                    orderpromise.push(ordpromise)
                }
                return Promise.all(orderpromise)
            })
            .then(function(result) {
                ordercreate = result
                return Cart.destroy({
                    where: {
                        UserId: req.authenticated.id
                    }
                })
            })
            .then(function(result) {
                res.status(201).json(ordercreate)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static GetOrder(req, res, next) {
        Order.findAll({
            where: {
                UserId: req.authenticated.id
            },
            include: ['Product', 'User']
        })
        .then(function(result) {
            res.status(200).json(result)
        })
        .catch(function(err) {
            next(err)
        })

    }
    static GetCartDetail(req, res, next) {
        Cart.findOne({
            where: {
                id: req.params.id
            },
            include: ['Product']
        })
            .then(result => {
                return res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            }) 
    }
}

module.exports = Controller