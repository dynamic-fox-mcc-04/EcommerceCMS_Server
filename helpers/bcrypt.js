const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(18)

const generate = (password) => {
    return bcrypt.hashSync(password, salt)
}

const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

// console.log(generate('test'));
// console.log(compare('test', '$2a$18$9FFknwMOxo9OyE2/NwCjNuYuwOp61cBoHWqYurURebqA3oSi9TVGa'))

module.exports = { generate, compare }