const {verify} = require("../helpers/jwt");
const {User} = require("../models");

function authentication(req, res, next)
{
    try 
    {
        let id = verify(req.headers.token);

        User.findByPk(id)
        .then(data =>
        {
            if(!data)
                return res.status(403).json({message : "You must login"});
            req.user_id = data.id;
            return next();
        })
        .catch(err =>
        {
            return next(err);
        })
    } catch(err) 
    {
        return next(err);
    }
}

module.exports = authentication;