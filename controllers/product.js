const {Product, Order} = require("../models");

class ProductController
{
    //All users
    static showAll(req, res, next)
    {
        Product.findAll()
        .then(data =>
        {
            return res.status(200).json(data);
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    static showOne(req, res, next)
    {
        let {id} = req.params;

        Product.findOne({where : {id}})
        .then(data =>
        {
            return res.status(200).json(data);
        })
        .catch(err =>
        {
            return next(err);
        })
    }
    //Customer
    static showCart(req, res, next)
    {
        const { Op } = require("sequelize");
        Order.findAll(
        {
            where:
            {
                [Op.and]:
                [
                    {'UserId': req.user_id},
                    {'buyed': false}
                ]
            },
            include: {model: Product}
        })
        .then(data =>
        {
            console.log(data)
            return res.status(200).json(data);
        })
        .catch(err =>
        {
            console.log(err)
            return next(err);
        })
    }

    static addCart(req, res, next)
    {
        const order =
        {
            ProductId: req.body.ProductId,
            UserId: req.user_id,
            sum: req.body.sum
        }
        console.log(order)
        Order.create(order)
        .then(data =>
        {
            const stock = req.body.stock - order.sum;
            console.log(data)
            Product.update({stock}, {where: {id: order.ProductId}})
            return res.status(200).json(data);
        })
        .catch(err =>
        {
            console.log(err)
            return next(err);
        })
    }

    static buy(req, res, next)
    {
        let {id, buyed} = req.body;

        Order.update({buyed}, {where: {id}})
        .then(data =>
        {
            return res.status(200).json(data);
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    //Admin
    static add(req, res, next)
    {
        let {name, image_url, price, stock, description} = req.body;
        let product = {name, image_url, price, stock, description};

        Product.create(product)
        .then(data =>
        {
            return res.status(201).json(data);
        })
        .catch(err =>
        {
            console.log(err)
            return next(err);
        })
    }

    static update(req, res, next)
    {
        let {name, image_url, price, stock, description} = req.body;
        let product = {name, image_url, price, stock, description};
        let {id} = req.params;

        Product.update(product, {where : {id}})
        .then(() =>
        {
            return res.status(200).json(product);
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    static delete(req, res, next)
    {
        let {id} = req.params;

        Product.destroy({where : {id}})
        .then(() =>
        {
            return res.status(200).json({message : "Data successfully deleted"});
        })
        .catch(err =>
        {
            console.log(err)
            return next(err);
        })
    }
}

module.exports = ProductController;