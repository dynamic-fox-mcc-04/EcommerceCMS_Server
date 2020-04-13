const errorHandler = (err, req, res, next) => {
    if (err.name == 'SequelizeValidationError') {
        const errors = err.errors.map(el => {
            return { message: el.message }
        })
        return res.status(400).json({
            errors
        })
    } else if (err.name == 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map(el => {
            return { message: el.message }
        })
        return res.status(400).json({
            errors
        })
    } else if (err.name == 'BadRequest') {
        return res.status(400).json({
            errors: err.errors
        })
    } else {
        return res.status(500).json(err)
    }
}

module.exports = errorHandler