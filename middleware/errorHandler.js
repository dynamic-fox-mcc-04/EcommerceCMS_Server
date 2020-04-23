function errorHandler(err, req, res, next) {
  if (err.name == 'SequelizeValidationError') {
    return res.status(400).json(err.errors[0])
  } else if (err.name == 'BadRequest') {
    return res.status(400).json(err.errors[0])
  } else if (err.name == 'NotFound') {
    return res.status(404).json(err.errors[0])
  } else if (err.name == 'UnAuthorized') {
    return res.status(403).json(err.errors[0])
  }else{
    console.log(err);

    return res.status(500).json(err)
  }
}

module.exports = errorHandler