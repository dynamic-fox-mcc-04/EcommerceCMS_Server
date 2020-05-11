const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {

    static login(req, res, next){
        
        User.findOne({
            where : {
               email : req.body.email 
            }
        })
        .then( result =>{

            if (result){
                if ( compare(req.body.password, result.password) ){
                    let payload = {
                        'id' : result.id,
                        'email' : result.email,
                        'role' : result.role
                    }

                    let token = generateToken( payload )

                    return res.status(200).json({
                        'access_token' : token
                    })

                } else {
                    return next({
                        name : 'bad request',
                        errors : [{ message : 'Invalid password/email'}]
                    })
                }
                
            } else {

                return next({
                    name : 'bad request',
                    errors : [{ message : 'Invalid password/email'}]
                })
            }
        })
        .catch(err => {

            return next(err)
        })

    }

}

module.exports = Controller