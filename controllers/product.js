const {Product} = require("../models");

class ProductController
{
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
            return next(err);
        })
    }
}

module.exports = ProductController;