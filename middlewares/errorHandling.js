function errorHandler (err,req,res,next) {
    if(err.name == 'SequelizeValidationError') {
        const errors= err.errors.map(el => ({
            message: el.message
        }))
        res.status(400).json({
            code:400,
            name:'Bad Request',
            errors : errors
        })
    } else if(err.name == 'BadRequest') {
        res.status(400).json({
            code:400,
            name: err.name,
            errors:err.errors
        }) 
    } else if(err.name == 'InternalServerError') {
        res.status(500).json({
            code:500,
            name: err.name,
            errors:err.errors
        }) 
    } else if(err.name == 'JsonWebTokenError') {
        // const errors = err.errors
        res.status(500).json({
            code:500,
            name:err.name,
            errors: [{
                message: err.message }]
        }) 
    } else if(err.name == 'NotFound') {
        res.status(404).json({
            code:404,
            name: err.name,
            errors:err.errors
        }) 
    }
}

module.exports= errorHandler