function errorHandler(err, req, res, next) {
    if(err.name === 'SequelizeValidationError') {
        let messages = []
        err.errors.forEach(element => {
            messages.push(element.message)
        })
        let finalMessage = ''
        if(messages.length === 1) {
            finalMessage = messages.join('')
        } else {
            finalMessage = messages.join(', ')
        }
        return res.status(400).json({ name: err.name, message: finalMessage })
    } else if(err.name === 'SequelizeUniqueConstraintError') {
       let messages = []
       err.errors.forEach(element => {
           messages.push(element.message)
       })
       let finalMessage = ''
       if(messages.length === 1) {
            finalMessage = messages.join('')
        } else {
            finalMessage = messages.join(', ')
        }
       return res.status(400).json({ name: err.name, message: finalMessage })
    } else if(err.name === 'JsonWebTokenError') {
        return res.status(400).json({ type: 'JWT error!', message: err.message })
    }
    else if(err.type) {
        return res.status(err.status).json(err)
    } else {
        return res.status(500).json({ error: err })
    }
   }
   
   module.exports = errorHandler