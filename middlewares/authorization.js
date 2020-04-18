const {Product} = require("../models");
const {User} = require("../models");

function authorization(req, res, next)
{
    let UserId = req.user_id;

    User.findByPk(UserId)
    .then(data =>
    {
        if(!data.dataValues)
            return res.status(404).json({error : "Product not found"});
        if(data.dataValues.role == 'admin')
            return next();
        
        return es.status(401).json({error : "Unauthorized"});
    })
    .catch(err =>
    {
        return next(err);
    })
}

module.exports = authorization;