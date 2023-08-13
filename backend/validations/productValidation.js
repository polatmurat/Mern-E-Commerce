const {body} = require('express-validator');

const productValidations = [
    body('title').not().isEmpty().trim().escape().withMessage('The title field cannot be left blank!'),
    body('price').custom((value) => {
        if (parseInt(value) < 1) {
            throw new Error('The price must be above $1');
        } else {
            return parseInt(value);
        }
    }).trim().escape(),
    body('discount').custom((value) => {
        if (parseInt(value) < 0) {
            throw new Error('The discount mustn\'t be negative.');
        } else {
            return parseInt(value);
        }
    }).trim().escape(),
    body('category').not().isEmpty().trim().escape().withMessage('The category field cannot be left blank!'),
    body('stock').custom((value) => {
        if (parseInt(value) < 1) {
            throw new Error('The stock must be at least 1');
        } else {
            return parseInt(value);
        }
    }).trim().escape(),
    body('description').not().isEmpty().trim().escape().withMessage('The description field cannot be left blank!'),
];

module.exports = {productValidations};