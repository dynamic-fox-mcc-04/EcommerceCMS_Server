const { User } = require('../models');
const jwt = require('jsonwebtoken');

class Controller {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({
      email,
      password
    })
      .then(response => {
        const payload = {
          id: response.id,
          email: response.email
        };
        res.status(201).json(payload);
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      }
    })
      .then(response => {
        const payload = {
          id: response.id,
          email: response.email
        };
        const token = jwt.sign(payload, process.env.SECRET);
        return res.status(200).json({
          token
        });
      })
      .catch(err => {
        next(err);
      });
  }
}
module.exports = Controller;
