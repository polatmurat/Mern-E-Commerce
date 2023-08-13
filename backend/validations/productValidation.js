const {body} = require('express-validator');

const productValidations = [
    body('title').not().isEmpty().trim().escape().withMessage('The title field cannot be left blank!'),
    body('price').not().isEmpty().trim().escape().withMessage('The price field cannot be left blank!'),
    body('discount').not().isEmpty().trim().escape().withMessage('The discount field cannot be left blank!'),
    body('category').not().isEmpty().trim().escape().withMessage('The category field cannot be left blank!'),
    body('stock').not().isEmpty().trim().escape().withMessage('The stock field cannot be left blank!'),
    body('description').not().isEmpty().trim().escape().withMessage('The description field cannot be left blank!'),
];

module.exports = {productValidations};