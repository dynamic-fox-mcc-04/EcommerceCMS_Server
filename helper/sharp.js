const sharp = require('sharp');
function sharpImage(req, res, next) {
  sharp('./' + req.file.path).toBuffer().then(
    (data) => {
      sharp(data).resize(250, 350).toFile('./' + req.file.path, (err, info) => {
        return next()
      });
    }
  ).catch(
    (err) => {
      return next(err)
    }
  )
}

module.exports = sharpImage