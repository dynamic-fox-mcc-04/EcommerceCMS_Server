function errorHandler(err, req, res, next) {
    switch(err.name) {
        case 'SequelizeValidationError': {
            const errors = err.errors.map(el => ({message: el.message}))
            return res.status(400).json({ 
                code: 400,
                name: 'Bad Request',
                errors 
            })
        }
        case 'SequelizeUniqueConstraintError': {
            const errors = err.errors.map(el => ({message: el.message}))
            return res.status(400).json({     
                code: 400,
                name: 'Bad Request',
                errors 
             })
        }

        case 'BadRequest':
            return res.status(400).json({ 
                code: 400,
                name: 'Bad Request',
                errors: err.errors 
            })

        case 'NotFound':
            return res.status(404).json({ 
                code: 404,
                name: 'Not Found',
                errors: err.errors 
            })
        
        case 'Unauthorized':
            return res.status(401).json({ 
                code: 401,
                name: 'Unauthorized',
                errors: err.errors 
            })
        
        default:
            return res.status(500).json({ 
                code: 500,
                name: 'Internal Server Error',
                errors: err.errors 
            })
    }
}

module.exports = errorHandler