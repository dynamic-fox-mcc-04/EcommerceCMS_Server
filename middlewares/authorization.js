const {Product} = require("../models");
const {User} = require("../models");

function authorization(req, res, next)
{
    let UserId = req.user_id;
    let {id} = req.params;

    Product.findByPk(id, {include : User})
    .then(data =>
    {
        console.log(data);
        if(!data)
            return res.status(404).json({error : "Product not found"});
        if(data.UserId == UserId)
            return next();
        
        return User.findByPk(UserId)
    })
    .then(data =>
    {
        if(data.role != "admin")
            return res.status(401).json({error : "Unauthorized"});

        return next();
    })
    .catch(err =>
    {
        return next(err);
    })
}

module.exports = authorization;