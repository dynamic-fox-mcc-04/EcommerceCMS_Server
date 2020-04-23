const bcrypt = require('bcrypt');

function encrypt(text)
{
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(text, salt);
}

function decrypt(text, hash)
{
    return bcrypt.compareSync(text, hash);
}

module.exports = {encrypt, decrypt};