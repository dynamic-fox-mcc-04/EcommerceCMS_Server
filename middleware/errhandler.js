module.exports = function(err, req, res, next) {
    if(err.name) {
        switch (err.name) {
            case 'SequelizeValidationError':
                let msg = {
                    message: 'Please Fill it Correctly'
                }
                return res.status(400).json(msg)
                break;
        
            default:
                let msg = {
                    message: 'Internal Server error'
                }
                return res.status(500).json(msg)
                break;
        }
    }   
    else {

    }
}