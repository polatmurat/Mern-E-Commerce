const { body } = require('express-validator');

const productValidations = [
    body('title').not().isEmpty().trim().escape().withMessage('The title field cannot be left blank!'),
    body('price').trim().escape().isInt({ min: 1 }).withMessage('The stock must be at least 1'),
    body('discount').trim().escape().isInt({ min: 0 }).withMessage('The stock must be at least 1'),
    body('category').not().isEmpty().trim().escape().withMessage('The category field cannot be left blank!'),
    body('stock').trim().escape().isInt({ min: 1 }).withMessage('The stock must be at least 1'),
    body('description').not().isEmpty().trim().escape().withMessage('The description field cannot be left blank!'),
];

module.exports = { productValidations };