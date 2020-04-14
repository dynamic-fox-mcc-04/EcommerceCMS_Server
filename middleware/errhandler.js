module.exports = function(err, req, res, next) {
    let errors;
    let msg;
    if(err.name) {
        switch (err.name) {
            case "SequelizeValidationError":
                errors = []
                err.errors.forEach(element => {
                    errors.push(element.message)
                });
                message = {
                    message: "Bad Request",
                    errors
                }
                status = 400
                return res.status(status).json(message)
                break;
            case "ReferenceError":
                message = {
                    message: "Internal Server Error"
                }
                status = 500
                return res.status(status).json(message)    
        
            default:
                console.log(err)
                console.log(err.name)
                message = {
                    message: err.message,
                    errors
                }
                return res.status(400).json(message)
                break;
        }
    }   
    else {
        switch (err.msg) {
            case 'Email Already Exist': 
            message = {
                message: 'Email Already Exist'
            }
            return res.status(400).json(msg)
            case 'User Does Not Exist': 
            message = {
                message: 'User Does Not Exist'
            }
            return res.status(400).json(msg)
            case "Wrong Email / Password":
                message = {
                    message: "Wrong Email / Password"
                }
                return res.status(400).json(message)
                
                break;
            case "Not Authorized":
                message = {
                    message: "Not Authorized"
                }
                return res.status(400).json(message)
                break;
            case 'Item Does Not Exist': 
                message = {
                    message: 'Item Does Not Exist'
                }
                return res.status(400).json(message)
            case 'Item With The Same Name Already Exist':
                message = {
                    message: 'Item With The Same Name Already Exist'
                }
                return res.status(400).json(message)
            case "Insufficient Stock": //Untuk Week 4,jadi ga ada test
                message = {
                    message: "Insufficient Stock",
                    id: err.id,
                    Stock: err.Stock
                }
                return res.status(400).json(message)
                break;
            default:
                console.log(err)
                console.log(err.msg)
                message = {
                    message: "Internal Server testing Error"
                }
                return res.status(500).json(message)
                break;
        }

    }
}