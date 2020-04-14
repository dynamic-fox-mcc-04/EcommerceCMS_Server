function errorHandler(err, req, res, next) {
    switch(err.name) {
        case 'SequelizeValidationError': {
            const errors = err.errors.map(el => ({message: el.message}))
            return res.status(400).json({ errors })
        }
        case 'SequelizeUniqueConstraintError': {
            const errors = err.errors.map(el => ({message: el.message}))
            return res.status(400).json({ errors })
        }

        case 'BadRequest':
            return res.status(400).json({ errors: err.errors })

        case 'NotFound':
            return res.status(404).json({ errors: err.errors })
        
        case 'Unauthorized':
            return res.status(401).json({ errors: err.errors })
        
        default:
            return res.status(500).json(err)
    }
}

module.exports = errorHandler