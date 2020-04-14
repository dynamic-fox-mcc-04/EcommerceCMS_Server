function errorHandler(err, req, res, next) {
  console.log(err);
  let status = 500;
  let errName = {
    message: 'Internal Server Error'
  }
  if(err.name === 'SequelizeValidationError') {
    status = 400;
    let arrMessage = []
    for(let i=0; i<err.errors.length ; i++) {
      arrMessage.push(err.errors[i].message)
    }
    errName = {
      message: 'Bad Request',
      errors: arrMessage
    }
  }
  else if(err.name === 'SequelizeUniqueConstraintError') {
    let arrMessage = []
    for(let i=0; i<err.errors.length ; i++) {
      arrMessage.push(err.errors[i].message)
    }
    status = 400;
    errName = {
      message: 'Bad Request',
      errors: arrMessage
    }
  }
  else if(err.name === 'Invalid email or password') {
    status = 400;
    errName = {
      message: 'Bad Request',
      errors: [err.name]
    }
  }
  else if(err.name === 'Not authenticated') {
    status = 401;
    errName = {
      message: 'Bad Request',
      errors: [err.name]
    }
  }
  else if(err.name === 'Unauthorized') {
    status = 401;
    errName = {
      message: 'Bad Request',
      errors: [err.name]
    }
  }
  else if(err.name === 'Admin only!') {
    status = 400;
    errName = {
      message: 'Bad Request',
      errors: [err.name]
    }
  }
  else if(err.name === 'NotFound') {
    status = 404;
    errName = {
      message: 'Item Not Found',
      errors: [err.name]
    }
  }
  res.status(status).json(errName)
}

module.exports = errorHandler