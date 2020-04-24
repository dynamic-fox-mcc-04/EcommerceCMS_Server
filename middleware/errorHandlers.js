
function errorHandler (err, req, res, next){

    if (err.name === "SequelizeValidationError"){
               
        let errors = err.errors.map(el => {
            return { message : el.message }
        })
        
        return res.status(400).json({
            type : 'bad request',
            errors : errors 
        })
    } else if (err.name == "Unauthorized"){
        res.status(404).json({
            type : 'bad request',
            errors : err.errors
        })
    } else if (err.name == "Not Found"){
        res.status(404).json({
            type : 'bad request',
            errors : err.errors
        })
     } else if (err.name == "bad request"){
            res.status(400).json({
                type : 'bad request',
                errors : err.errors
        })
    } else if (err.name = "JsonWebTokenError") {
        return res.status(400).json({
            type : 'bad request',
            errors : [{ message : 'Request Token' }]   
        })
    } else {
        return res.status(500).json({
            type : "Internal Server Error",
            error : err.errors
        })
    }
}

module.exports = errorHandler