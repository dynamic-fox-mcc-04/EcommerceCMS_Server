const { User } = require("../models")
const { verToken } = require("../helpers/jwt")

module.exports = (req, res, next) => {
    try {
        let decoded = verToken(req.headers.access_token)
        User.findOne({
            where: {
                'id': decoded.id
            }
        }).then(result => {
            if (result) {
                req.currentUserId = result.id
                return next()
            } else {
                console.log('ERROR AUTHENTICATE 1')
            }
        }).catch(err => {
            console.log('ERROR AUTHENTICATE', err)
        })
    } catch (error) {
        return next (error)
    }
}
