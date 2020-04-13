const models = require('../models')

class CategoryController {
    static addCategory(req, res, next) {
        const data = { categoryName: req.body.categoryName }
        return models.Category.create(data)
            .then(result => {
                return res.status(201).json({
                    message: `successfully added new category`
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = CategoryController