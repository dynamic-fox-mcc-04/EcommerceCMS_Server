module.exports = ((err, req, res, next) => {
    // console.log('ini error', err)
    if(err.name == 'SequelizeValidationError') {
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(400).json({
            errors
        })
    } else if(err.name == 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(400).json({
            errors
        })
    } else if(err.name == 'BadRequest'){
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(400).json({
            errors
        })
    } else if(err.name == 'Forbidden'){
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(403).json({
            errors
        })
    } else if(err.name == "NotFound"){
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(404).json({
            errors
        })
    } else if(err.name == "JsonWebTokenError"){
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(401).json({
            errors
        })
    } else if(err.name == "Unauthorized"){
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(401).json({
            errors
        })
    } else {
        return res.status(500).json(err)
    }
})