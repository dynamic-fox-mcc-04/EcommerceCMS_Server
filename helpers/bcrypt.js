const bcrypt = require('bcryptjs')
function Encrypt(pass){
return bcrypt.genSaltSync(pass,bcrypt.hashSync(10))
}
function Decrypt(pass,hash){
return bcrypt.compareSync(pass,hash)
}
module.exports={Encrypt,Decrypt}