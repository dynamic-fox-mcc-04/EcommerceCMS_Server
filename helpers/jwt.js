const jwt = require('jsonwebtoken');

function getToken(data)
{
    return jwt.sign(data, process.env.Token);
}

function verify(token)
{
    jwt.verify(token, process.env.Token);
}

module.exports = {getToken, verify};