const {User} = require("../models");
const {decrypt} = require("../helpers/bcrypt");
const {getToken} = require("../helpers/jwt");

class UserController
{
    static register(req, res, next)
    {
        let {name, email, password} = req.body;
        let user = {name, email, password};

        User.create(user)
        .then(data =>
        {
            return res.status(201).json({message : "User created"});
        })
        .catch(err =>
        {
            return next(err);
        })
    }

    static login(req, res)
    {
        let {email, password} = req.body;

        User.findOne({where : {email}})
        .then(data =>
        {
            if(!data)
                return res.status(404).json({error : "Invalid email/pasword"});
            if(!decrypt(password, data.password))
                return res.status(404).json({error : "Invalid email/pasword"});

            req.headers.token = getToken(data.id);
            return res.status(200).json({token : req.headers.token, role : data.role});
        })
    }
}

module.exports = UserController;